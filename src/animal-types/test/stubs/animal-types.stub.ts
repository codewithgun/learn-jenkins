import { AnimalType } from 'src/animal-types/entities/animal-type.entity';

const createdAt = new Date();

export const animalTypeStub = (): AnimalType => {
	return {
		id: 1,
		name: 'Dog',
		description: 'Cute dog',
		animals: [],
		createdAt,
	};
};