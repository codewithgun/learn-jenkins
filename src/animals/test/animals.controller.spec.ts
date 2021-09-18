import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { animalTypeStub } from 'src/animal-types/test/stubs/animal-types.stub';
import { AnimalsController } from '../animals.controller';
import { AnimalsService } from '../animals.service';
import { UpdateAnimalDto } from '../dto/update-animal.dto';
import { animalStub } from './stub/animal-stub';

jest.mock('../animals.service');

describe('AnimalsController', () => {
	let controller: AnimalsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AnimalsController],
			providers: [AnimalsService],
		}).compile();

		controller = module.get<AnimalsController>(AnimalsController);
		jest.clearAllMocks();
	});

	describe('create', () => {
		describe('when create is called', () => {
			it('it should create new animal', async () => {
				let createdAnimal = await controller.create({
					animalTypeId: animalStub().animalType.id,
					name: animalStub().name,
					description: animalStub().description,
				});
				expect(createdAnimal).toEqual(animalStub());
			});
		});
	});

	describe('findAll', () => {
		describe('when findAll is called', () => {
			it('it should return array of animals', async () => {
				let animals = await controller.findAll();
				expect(animals).toContainEqual(animalStub());
			});
		});
	});

	describe('findOne', () => {
		describe('when findOne is called with valid id', () => {
			it('it should found a animal', async () => {
				let animal = await controller.findOne(animalStub().id);
				expect(animal).toEqual(animalStub());
			});
		});

		describe('when findOne is called with invalid id', () => {
			it('it should throw BadRequestException', async () => {
				await expect(controller.findOne(undefined)).rejects.toThrowError(BadRequestException);
			});
		});
	});

	describe('update', () => {
		let updateAnimalDto: UpdateAnimalDto = {
			animalTypeId: animalStub().animalTypeId,
			description: animalStub().description,
			name: animalStub().name,
		};
		describe('when update is called with invalid id', () => {
			it('it should throw BadRequestException', async () => {
				await expect(controller.update(undefined, updateAnimalDto)).rejects.toThrowError(BadRequestException);
			});
		});

		describe('when update is called with valid id', () => {
			it('it should return updated animal', async () => {
				let updatedAnimal = await controller.update(animalStub().id, updateAnimalDto);
				expect(updatedAnimal).toEqual(animalStub());
			});
		});
	});
});
