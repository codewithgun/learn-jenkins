import { animalTypeStub } from '../test/stubs/animal-types.stub';

export const AnimalTypesService = jest.fn().mockReturnValue({
	create: jest.fn().mockResolvedValue(animalTypeStub()),
	findAll: jest.fn().mockResolvedValue([animalTypeStub()]),
	findOne: jest.fn().mockImplementation((id: number) => [animalTypeStub()].find((at) => at.id == id)),
	update: jest.fn().mockImplementation((id: number) => [animalTypeStub()].find((at) => at.id == id)),
	remove: jest.fn().mockResolvedValue(true),
});
