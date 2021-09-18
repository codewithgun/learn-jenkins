import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnimalType } from 'src/animal-types/entities/animal-type.entity';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { IAnimalService } from './interface/animal.service.interface';

@Injectable()
export class AnimalsService extends IAnimalService {
	animalRepository: Repository<Animal>;
	animalTypeRepository: Repository<AnimalType>;
	constructor(@InjectRepository(Animal) animalRepository: Repository<Animal>, @InjectRepository(AnimalType) animalTypeRepository: Repository<AnimalType>) {
		super();
		this.animalRepository = animalRepository;
		this.animalTypeRepository = animalTypeRepository;
	}

	async create(createAnimalDto: CreateAnimalDto): Promise<Animal> {
		const { animalTypeId, name } = createAnimalDto;
		let animalType = await this.animalTypeRepository.findOne(animalTypeId);
		if (!animalType) {
			throw new BadRequestException('Animal type not found');
		}
		return this.animalRepository.save(this.animalRepository.create(createAnimalDto));
	}

	async findAll(): Promise<Animal[]> {
		return this.animalRepository.find();
	}

	async findOne(id: number): Promise<Animal | undefined> {
		return this.animalRepository.findOne(id);
	}

	/**
	 *
	 * @param id
	 * @param updateAnimalDto
	 * @returns updated animal
	 * @throws {@link EntityNotFoundError}
	 */
	async update(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal | undefined> {
		const { animalTypeId } = updateAnimalDto;
		let animal = await this.animalRepository.findOne(id);
		if (animal) {
			if (animalTypeId !== undefined) {
				await this.animalTypeRepository.findOneOrFail(animalTypeId);
			}
			await this.animalRepository.update(id, updateAnimalDto);
			return {
				...animal,
				...updateAnimalDto,
			};
		}
	}

	async remove(id: number): Promise<boolean> {
		await this.animalRepository.delete(id);
		return true;
	}
}
