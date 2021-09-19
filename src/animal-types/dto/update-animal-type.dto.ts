import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAnimalTypeDto {
	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	name?: string;

	@ApiPropertyOptional()
	@IsString()
	@IsOptional()
	description?: string;
}
