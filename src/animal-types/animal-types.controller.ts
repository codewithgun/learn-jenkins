import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnimalTypesService } from './animal-types.service';
import { CreateAnimalTypeDto } from './dto/create-animal-type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal-type.dto';
import { AnimalType } from './entities/animal-type.entity';

@ApiTags('AnimalTypes')
@Controller('animal-types')
export class AnimalTypesController {
	constructor(private readonly animalTypesService: AnimalTypesService) {}

	@Post()
	@ApiCreatedResponse({
		type: AnimalType,
	})
	create(@Body() createAnimalTypeDto: CreateAnimalTypeDto): Promise<AnimalType> {
		return this.animalTypesService.create(createAnimalTypeDto);
	}

	@Get()
	findAll() {
		return this.animalTypesService.findAll();
	}

	/**
	 * Retrieves an animal type
	 *
	 * @param id - the id of the animal type
	 * @returns the retrieved animal type
	 *
	 * @throws {@link BadRequestException}
	 * This exception is thrown if the input is not a valid ISBN number.
	 *
	 * @public
	 */
	@Get(':id')
	async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<AnimalType> {
		let animalType = await this.animalTypesService.findOne(+id);
		if (!animalType) {
			throw new BadRequestException('Animal type not found');
		}
		return animalType;
	}

	@Patch(':id')
	async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateAnimalTypeDto: UpdateAnimalTypeDto): Promise<AnimalType> {
		let updatedAnimalType = await this.animalTypesService.update(id, updateAnimalTypeDto);
		if (!updatedAnimalType) {
			throw new BadRequestException('Animal type not found');
		}
		return updatedAnimalType;
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.animalTypesService.remove(+id);
	}
}
