import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  Query,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import CreateTaskDTO from './dtos/create.dto';
import UpdateTaskDTO from './dtos/update.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger/dist';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiBody({ type: CreateTaskDTO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTask(@Body() data: CreateTaskDTO) {
    return await this.tasksService.create(data);
  }

  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiBody({ type: UpdateTaskDTO })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() data: UpdateTaskDTO) {
    if (isNaN(+id)) {
      throw new BadRequestException(`Id must be a number id: ${id}`);
    }
    return await this.tasksService.updateTask(id, data);
  }

  @ApiQuery({ name:'completed', type: Boolean, required: false })
  @ApiQuery({ name:'search', type: String, required: false })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTasks(
    @Query('completed') completed: string,
    @Query('search') search: string,
  ) {
    return await this.tasksService.getTasks(
      completed,
      search,
    );
  }

  @ApiParam({ name: 'id', type: Number, required: true })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async getTask(@Param('id') id: number) {
    return await this.tasksService.getTask(id);
  }

  @ApiParam({ name: 'id', type: Number, required: true })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTask(@Param('id') id: number) {
    return await this.tasksService.deleteTask(id);
  }
}
