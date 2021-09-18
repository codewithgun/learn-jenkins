import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

@ApiTags('Animals')
@Controller('animals')
export class AnimalsController {
	constructor(private readonly animalsService: AnimalsService) {}

	@Post()
	async create(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
		return this.animalsService.create(createAnimalDto);
	}

	@Get()
	async findAll(): Promise<Animal[]> {
		return this.animalsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Animal> {
		let animal = await this.animalsService.findOne(id);
		if (!animal) {
			throw new BadRequestException('Animal not found');
		}
		return animal;
	}

	@Patch(':id')
	async update(@Param('id', new ParseIntPipe()) id: number, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
		let updatedAnimal = await this.animalsService.update(id, updateAnimalDto);
		if (!updatedAnimal) {
			throw new BadRequestException('Animal not found');
		}
		return updatedAnimal;
	}

	@Delete(':id')
	async remove(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
		return this.animalsService.remove(id);
	}
}
