import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column('varchar', { name: 'title' })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp', { name: 'createdAt' })
  createdAt: Date;

  @Column('timestamp', { name: 'updatedAt' })
  updatedAt: Date;

  @Column('bool', { name: 'completed' })
  completed: boolean;
}
