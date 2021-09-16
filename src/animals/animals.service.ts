import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';
import { IAnimalService } from './interface/animal.service.interface';

@Injectable()
export class AnimalsService extends IAnimalService {
	animalRepository: Repository<Animal>;
	constructor(@InjectRepository(Animal) animalRepository: Repository<Animal>) {
		super();
		this.animalRepository = animalRepository;
	}

	create(createAnimalDto: CreateAnimalDto) {
		return 'This action adds a new animal';
	}

	findAll() {
		return `This action returns all animals`;
	}

	findOne(id: number) {
		return `This action returns a #${id} animal`;
	}

	update(id: number, updateAnimalDto: UpdateAnimalDto) {
		return `This action updates a #${id} animal`;
	}

	remove(id: number) {
		return `This action removes a #${id} animal`;
	}
}
