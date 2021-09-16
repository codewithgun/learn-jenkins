import { Repository } from 'typeorm';
import { CreateAnimalTypeDto } from '../dto/create-animal-type.dto';
import { UpdateAnimalTypeDto } from '../dto/update-animal-type.dto';
import { AnimalType } from '../entities/animal-type.entity';

export abstract class IAnimalTypesService {
	abstract animalTypeRepository: Repository<AnimalType>;
	abstract create(createAnimalTypeDto: CreateAnimalTypeDto): Promise<AnimalType>;
	abstract findAll(): Promise<AnimalType[]>;
	abstract findOne(id: number): Promise<AnimalType | undefined>;
	abstract update(id: number, updateAnimalTypeDto: UpdateAnimalTypeDto): Promise<AnimalType | undefined>;
	abstract remove(id: number): Promise<boolean>;
}
