import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimalType } from 'src/animal-types/entities/animal-type.entity';
import { animalTypeStub } from 'src/animal-types/test/stubs/animal-types.stub';
import { AnimalTypeRepository } from 'src/animal-types/__mocks__/animal-types.repository';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { AnimalsService } from './../animals.service';
import { CreateAnimalDto } from './../dto/create-animal.dto';
import { Animal } from './../entities/animal.entity';
import { AnimalRepository } from './../__mocks__/animal-repository';
import { animalStub } from './stub/animal-stub';

describe('AnimalsService', () => {
	let service: AnimalsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnimalsService,
				{
					provide: getRepositoryToken(AnimalType),
					useClass: AnimalTypeRepository,
				},
				{
					provide: getRepositoryToken(Animal),
					useClass: AnimalRepository,
				},
			],
		}).compile();

		service = module.get<AnimalsService>(AnimalsService);
	});

	describe('create', () => {
		describe('when create a new animal', () => {
			it('it should return the newly created animal', async () => {
				let createAnimalDto: CreateAnimalDto = {
					animalTypeId: animalTypeStub().id,
					name: animalStub().name,
				};
				let animal = await service.create(createAnimalDto);
				expect(animal).not.toBeUndefined();
				expect(animal).toEqual(animalStub());
			});
		});

		describe('when create a new animal with non-exist animal type', () => {
			it('it should throw error', async () => {
				let createAnimalDto: CreateAnimalDto = {
					animalTypeId: undefined,
					name: animalStub().name,
				};
				await expect(service.create(createAnimalDto)).rejects.toThrowError(BadRequestException);
			});
		});
	});

	describe('findAll', () => {
		describe('when find all animals', () => {
			it('it should return array of animals', async () => {
				let animals = await service.findAll();
				expect(Array.isArray(animals)).toBe(true);
				expect(animals).toContainEqual(animalStub());
			});
		});
	});

	describe('findOne', () => {
		describe('when find animal with existing id', () => {
			it('it should return the animal with associated id', async () => {
				let animal = await service.findOne(animalStub().id);
				expect(animal).not.toBeUndefined();
				expect(animal).toEqual(animalStub());
			});
		});

		describe('when find animal with non-exist id', () => {
			it('it should return undefined', async () => {
				let animal = await service.findOne(undefined);
				expect(animal).toBeUndefined();
			});
		});
	});

	describe('update', () => {
		let updateAnimalDto: UpdateAnimalDto = {
			name: animalStub().name,
			description: animalStub().description,
			animalTypeId: animalStub().animalType.id,
		};
		describe('when update an animal with existing id', () => {
			it('it should return updated animal', async () => {
				let updatedAnimal = await service.update(animalStub().id, updateAnimalDto);
				expect(updatedAnimal).not.toBeUndefined();
				expect(updatedAnimal).toEqual(animalStub());
			});
		});

		describe('when update an animal with non-exist id', () => {
			it('it should return undefined', async () => {
				let updatedAnimal = await service.update(undefined, updateAnimalDto);
				expect(updatedAnimal).toBeUndefined();
			});
		});
	});
});
