import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAnimalDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@Min(0)
	@IsNumber()
	animalTypeId: number;

	@ApiProperty()
	@IsString()
	description: string;
}
