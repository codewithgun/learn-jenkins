import { animalStub } from '../test/stub/animal-stub';

export const AnimalsService = jest.fn().mockReturnValue({
	create: jest.fn().mockResolvedValue(animalStub()),
	findAll: jest.fn().mockResolvedValue([animalStub()]),
	findOne: jest.fn().mockImplementation((id: number) => [animalStub()].find((a) => a.id == id)),
	update: jest.fn().mockImplementation((id: number) => [animalStub()].find((a) => a.id == id)),
	remove: jest.fn().mockResolvedValue(true),
});
