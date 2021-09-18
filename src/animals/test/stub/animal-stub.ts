import { animalTypeStub } from 'src/animal-types/test/stubs/animal-types.stub';
import { Animal } from 'src/animals/entities/animal.entity';

const createdAt = new Date();

export const animalStub = (): Animal => {
	return {
		id: 1,
		animalTypeId: animalTypeStub().id,
		name: 'Shiba Inu',
		description: 'Angry yet cute',
		createdAt,
		animalType: animalTypeStub(),
	};
};
