import { IsOptional, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger/dist';
import { IsNotEmptyString } from 'src/common/decorators/is-not-empty-string.decorator';

export default class UpdateTaskDTO {
  @ApiProperty({ name: 'title', type: String, required: true })
  @IsString({ message: 'title field required' })
  @IsNotEmptyString()
  @IsOptional()
  title?: string;

  @ApiProperty({ name: 'description', type: String, required: false })
  @IsString({ message: 'description must be a string' })
  @IsNotEmptyString()
  @IsOptional()
  description?: string;

  @ApiProperty({ name: 'completed', type: Boolean, required: false })
  @IsBoolean({ message: 'completed must be a boolean' })
  @IsOptional()
  completed?: boolean
}
