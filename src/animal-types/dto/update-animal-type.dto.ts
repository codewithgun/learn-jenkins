import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAnimalTypeDto {
	@ApiPropertyOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsString()
	description?: string;
}
