import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AnimalTypesModule } from 'src/animal-types/animal-types.module';
import { CreateAnimalTypeDto } from 'src/animal-types/dto/create-animal-type.dto';
import { UpdateAnimalTypeDto } from 'src/animal-types/dto/update-animal-type.dto';
import { AnimalType } from 'src/animal-types/entities/animal-type.entity';
import { animalTypeStub } from 'src/animal-types/test/stubs/animal-types.stub';
import { AnimalTypeRepository } from 'src/animal-types/__mocks__/animal-types.repository';
import { GlobalValidationPipe } from 'src/shared/pipes/global-validation-pipe';
import * as request from 'supertest';

describe('AnimalTypeController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AnimalTypesModule],
		})
			.overrideProvider(getRepositoryToken(AnimalType))
			.useClass(AnimalTypeRepository)
			.compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new GlobalValidationPipe());
		await app.init();
	});

	describe('when GET - /animal-types', () => {
		it('it should return an array of animal types', () => {
			return request(app.getHttpServer())
				.get('/animal-types')
				.expect(200)
				.then((res) => {
					// When date return it will become string
					// Therefore, toEqual or toContainEqual test will fail
					expect(Array.isArray(res.body)).toBe(true);
				});
		});
	});

	describe('when POST - /animal-types', () => {
		describe('if non-string name passed', () => {
			let nonStringNameDto = {
				name: 12345,
			};
			it('it should result in error "name must be a string"', () => {
				return request(app.getHttpServer())
					.post('/animal-types')
					.send(nonStringNameDto)
					.then((res) => {
						expect(res.body.message).toEqual('name must be a string');
					});
			});
		});

		describe('if missing parameter', () => {
			it('it should result in 400', () => {
				return request(app.getHttpServer()).post('/animal-types').send({}).expect(HttpStatus.BAD_REQUEST);
			});
		});

		describe('if valid value passed', () => {
			it('it return newly created animal type', () => {
				let createAnimalTypeDto: CreateAnimalTypeDto = {
					description: animalTypeStub().description,
					name: animalTypeStub().name,
				};
				return request(app.getHttpServer()).post('/animal-types').send(createAnimalTypeDto).expect(HttpStatus.CREATED);
			});
		});
	});

	describe('when GET - /animal-types/:id', () => {
		describe('if non-exist id was passed', () => {
			it('it should result in error "Animal type not found"', () => {
				return request(app.getHttpServer())
					.get(`/animal-types/12345`)
					.expect(HttpStatus.BAD_REQUEST)
					.then((res) => {
						expect(res.body.message).toBe('Animal type not found');
					});
			});
		});

		describe('if valid id was passed', () => {
			it('it should return the associated animal type', () => {
				return request(app.getHttpServer())
					.get(`/animal-types/${animalTypeStub().id}`)
					.expect(HttpStatus.OK)
					.then((res) => expect(res.body.id).toEqual(animalTypeStub().id));
			});
		});
	});

	describe('when PATCH - /animal-types/:id', () => {
		let updateAnimalTypeDto: UpdateAnimalTypeDto = {
			description: animalTypeStub().description,
		};
		describe('if non-exist id was passed', () => {
			it('it should result in "Animal type not found"', () => {
				return request(app.getHttpServer())
					.patch('/animal-types/123456')
					.send(updateAnimalTypeDto)
					.expect(HttpStatus.BAD_REQUEST)
					.then((res) => {
						expect(res.body.message).toEqual('Animal type not found');
					});
			});
		});

		describe('if invalid value was passed', () => {
			it('it should result in 400', () => {
				return request(app.getHttpServer())
					.patch(`/animal-types/${animalTypeStub().id}`)
					.send({
						name: 123456,
					})
					.expect(HttpStatus.BAD_REQUEST)
					.then((res) => {
						expect(res.body.message).toEqual('name must be a string');
					});
			});
		});

		describe('if valid value was passed', () => {
			it('it should return newly updated animal type', () => {
				return request(app.getHttpServer())
					.patch(`/animal-types/${animalTypeStub().id}`)
					.send(updateAnimalTypeDto)
					.expect(HttpStatus.OK)
					.then((res) => {
						expect(res.body.description).toBe(updateAnimalTypeDto.description);
					});
			});
		});
	});
});
