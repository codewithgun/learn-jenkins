import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export class CreateAnimalTypeDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	name: string;

	@IsNotEmpty()
	@IsString()
	@ApiProperty()
	description: string;
}
