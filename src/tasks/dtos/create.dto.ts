import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export default class CreateTaskDTO {
  @ApiProperty({ name: 'title', type: String, required: true })
  @IsString({ message: 'title field required' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: 'description', type: String, required: false })
  @IsString({ message: 'description must be a string' })
  @IsNotEmpty()
  @IsOptional()
  description: string;
}
