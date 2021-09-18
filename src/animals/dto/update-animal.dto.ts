import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateAnimalDto {
	@ApiPropertyOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional()
	@IsString()
	description?: string;

	@ApiPropertyOptional()
	@IsNumber()
	animalTypeId?: number;
}
