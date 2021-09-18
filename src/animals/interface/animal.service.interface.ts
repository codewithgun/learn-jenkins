// Because the nature of typescript
// Dependency Injection using interface in NestJs was impossible

import { AnimalType } from 'src/animal-types/entities/animal-type.entity';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from '../dto/create-animal.dto';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { Animal } from '../entities/animal.entity';

// However, the abstract class can used as dirty trick to achieve IoC
export abstract class IAnimalService {
	abstract animalRepository: Repository<Animal>;
	abstract animalTypeRepository: Repository<AnimalType>;
	abstract create(createAnimalDto: CreateAnimalDto);
	abstract findAll();
	abstract findOne(id: number);
	abstract update(id: number, updateAnimalDto: UpdateAnimalDto);
	abstract remove(id: number);
}
