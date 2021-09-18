import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AnimalTypesController } from '../animal-types.controller';
import { AnimalTypesService } from '../animal-types.service';
import { UpdateAnimalTypeDto } from '../dto/update-animal-type.dto';
import { animalTypeStub as animalTypesStub } from './stubs/animal-types.stub';

// Looks like the mocked module need to have same path, and filename
// But the mocked module, put inside __mocks__
// https://stackoverflow.com/questions/55571012/manual-mocking-using-mocks-not-working
jest.mock('../animal-types.service');

describe('AnimalTypesController', () => {
	let animalTypesController: AnimalTypesController;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [],
			controllers: [AnimalTypesController],
			providers: [AnimalTypesService],
		}).compile();

		animalTypesController = moduleRef.get<AnimalTypesController>(AnimalTypesController);
		jest.clearAllMocks();
	});

	describe('create', () => {
		describe('when create is called', () => {
			it('it should create new animal type', async () => {
				let createdAnimalType = await animalTypesController.create({
					description: animalTypesStub().description,
					name: animalTypesStub().name,
				});
				expect(createdAnimalType).toEqual(animalTypesStub());
			});
		});
	});

	describe('findAll', () => {
		describe('when findAll is called', () => {
			it('it should return array of animal types', async () => {
				let animalTypes = await animalTypesController.findAll();
				expect(animalTypes).toContainEqual(animalTypesStub());
			});
		});
	});

	describe('findOne', () => {
		describe('when findOne is called with valid id', () => {
			it('it should found a animal type', async () => {
				let animalType = await animalTypesController.findOne(animalTypesStub().id);
				expect(animalType).toEqual(animalTypesStub());
			});
		});

		describe('when findOne is called with invalid id', () => {
			it('it should throw BadRequestException', async () => {
				await expect(animalTypesController.findOne(undefined)).rejects.toThrowError(BadRequestException);
			});
		});
	});

	describe('update', () => {
		let updateAnimalTypeDto: UpdateAnimalTypeDto = {
			description: 'New cute dog',
			name: 'New cute dog',
		};
		describe('when update is called with invalid id', () => {
			it('it should throw BadRequestException', async () => {
				await expect(animalTypesController.update(-1, updateAnimalTypeDto)).rejects.toThrowError(BadRequestException);
			});
		});

		describe('when update is called with valid id', () => {
			it('it should return updated animal type', async () => {
				let updatedAnimalType = await animalTypesController.update(animalTypesStub().id, updateAnimalTypeDto);
				expect(updatedAnimalType).toEqual(animalTypesStub());
			});
		});
	});
});
