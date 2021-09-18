import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimalType } from '../entities/animal-type.entity';
import { AnimalTypeRepository } from '../__mocks__/animal-types.repository';
import { AnimalTypesService } from '../animal-types.service';
import { CreateAnimalTypeDto } from '../dto/create-animal-type.dto';
import { animalTypeStub } from './stubs/animal-types.stub';
import { UpdateAnimalTypeDto } from '../dto/update-animal-type.dto';

// jest.mock('typeorm');

describe('AnimalTypesService', () => {
	let service: AnimalTypesService;
	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AnimalTypesService,
				{
					provide: getRepositoryToken(AnimalType),
					useValue: new AnimalTypeRepository(),
				},
			],
		}).compile();

		service = module.get<AnimalTypesService>(AnimalTypesService);
		jest.clearAllMocks();
	});

	describe('create', () => {
		describe('when add new animal type', () => {
			it('it should add a new animal type', async () => {
				let createAnimalTypeDto: CreateAnimalTypeDto = {
					name: animalTypeStub().name,
					description: animalTypeStub().description,
				};
				let newlyCreatedAnimalType = await service.create(createAnimalTypeDto);
				expect(newlyCreatedAnimalType).not.toBeUndefined();
			});
		});
	});

	describe('findAll', () => {
		describe('when get all animal types', () => {
			it('it should return an array of animal types', async () => {
				let animalTypes = await service.findAll();
				expect(animalTypes).toContainEqual(animalTypeStub());
				expect(Array.isArray(animalTypes)).toBe(true);
			});
		});
	});

	describe('findOne', () => {
		describe('when find animal type with exist id', () => {
			it('it should return the animal type', async () => {
				let animalType = await service.findOne(animalTypeStub().id);
				expect(animalType).toEqual(animalTypeStub());
			});
		});

		describe('when find animal type with non-exist id', () => {
			it('it should not return any animal type', async () => {
				let result = await service.findOne(undefined);
				expect(result).toBeUndefined();
			});
		});
	});

	describe('update', () => {
		let updateAnimalTypeDto: UpdateAnimalTypeDto = {
			name: animalTypeStub().name,
			description: animalTypeStub().description,
		};
		describe('when update an exist animal type', () => {
			it('it should return updated animal type', async () => {
				let updatedAnimalType = await service.update(animalTypeStub().id, updateAnimalTypeDto);
				expect(updatedAnimalType).not.toBeUndefined();
				expect(updatedAnimalType).toEqual(animalTypeStub());
			});
		});

		describe('when update an non-exist animal type', () => {
			it('it should return undefined', async () => {
				let updatedAnimalType = await service.update(undefined, updateAnimalTypeDto);
				expect(updatedAnimalType).toBeUndefined();
			});
		});
	});
});
