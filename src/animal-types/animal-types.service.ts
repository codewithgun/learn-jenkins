import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalTypeDto } from './dto/create-animal-type.dto';
import { UpdateAnimalTypeDto } from './dto/update-animal-type.dto';
import { AnimalType } from './entities/animal-type.entity';
import { IAnimalTypesService } from './interface/animal-types.service.interace';

@Injectable()
export class AnimalTypesService extends IAnimalTypesService {
	animalTypeRepository: Repository<AnimalType>;
	constructor(@InjectRepository(AnimalType) animalTypeRepository: Repository<AnimalType>) {
		super();
		this.animalTypeRepository = animalTypeRepository;
	}

	// TSDoc specification
	/**
	 * Create a new animal type
	 * @param createAnimalTypeDto Consists of the new animal type name
	 * @returns Newly created animal type
	 */
	async create(createAnimalTypeDto: CreateAnimalTypeDto): Promise<AnimalType> {
		let animalType = await this.animalTypeRepository.findOne({
			where: {
				name: createAnimalTypeDto.name,
			},
		});
		if (animalType) {
			return animalType;
		}
		return await this.animalTypeRepository.save(
			this.animalTypeRepository.create({
				...createAnimalTypeDto,
			}),
		);
	}

	/**
	 * Get all animal types
	 * @returns An array of animal type
	 */
	async findAll(): Promise<AnimalType[]> {
		return await this.animalTypeRepository.find();
	}

	async findOne(id: number): Promise<AnimalType | undefined> {
		return await this.animalTypeRepository.findOne(id);
	}

	async update(id: number, updateAnimalTypeDto: UpdateAnimalTypeDto): Promise<AnimalType | undefined> {
		let existingAnimalType = await this.findOne(id);
		if (existingAnimalType) {
			await this.animalTypeRepository.update(id, updateAnimalTypeDto);
			return {
				...existingAnimalType,
				...updateAnimalTypeDto,
			};
		}
	}

	async remove(id: number): Promise<boolean> {
		await this.animalTypeRepository.delete(id);
		return true;
	}
}
