import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Task } from 'src/tasks/entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import CreateTaskDTO from './dtos/create.dto';
import UpdateTaskDTO from './dtos/update.dto';
import { TasksInterfaces } from './interfaces/task.interface';
import * as moment from 'moment';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  convertStringToBoolean(value: string) {
    switch (value) {
      case 'true':
        return true;

      case 'false':
        return false;
      default:
        return false;
    }
  }

  async create(data: CreateTaskDTO): Promise<Partial<Task>> {
    try {
      const task: Partial<Task> = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
        completed: false,
      };
      return await this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  getWhereStatement(completed?: string, search?: string) {
    if (search && completed) {
      return [
        {
          completed: completed
            ? this.convertStringToBoolean(completed)
            : undefined,
          description: search ? ILike(`%${search}%`) : undefined,
        },
        {
          completed: completed
            ? this.convertStringToBoolean(completed)
            : undefined,
          title: search ? ILike(`%${search}%`) : undefined,
        },
      ];
    } else if (search) {
      return [
        {
          description: search ? ILike(`%${search}%`) : undefined,
        },
        {
          title: search ? ILike(`%${search}%`) : undefined,
        },
      ];
    } else if (completed) {
      return {
        completed: completed
          ? this.convertStringToBoolean(completed)
          : undefined,
      };
    } else {
      return {};
    }
  }

  async getTasks(
    completed: string = null,
    search: string = null,
  ): Promise<{ entries: Task[]; count: number }> {
    try {
      const [entries, count] = await this.taskRepository.findAndCount({
        where: this.getWhereStatement(completed, search),
      });
      return {
        entries,
        count,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getTask(id: number): Promise<TasksInterfaces.ITask> {
    try {
      const task = await this.taskRepository.findOne({ where: { id } });

      if (!task) {
        throw new NotFoundException(`Task no found with id: ${id}`);
      }

      return {
        ...task,
        createdAt: moment(task.createdAt).format('DD/MM/YYYY HH:mm:ss'),
        updateAt: moment(task.updatedAt).format('DD/MM/YYYY HH:mm:ss'),
        completed: Boolean(task.completed),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateTask(id: number, data: UpdateTaskDTO): Promise<void> {
    try {
      await this.getTask(id);

      const updateTask: Partial<Task> = { ...data, updatedAt: new Date() };
      await this.taskRepository.update({ id }, updateTask);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.getTask(id);

      await this.taskRepository.delete({ id });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error.message);
    }
  }
}
