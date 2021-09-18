import { AnimalType } from '../entities/animal-type.entity';
import { animalTypeStub } from '../test/stubs/animal-types.stub';

export class AnimalTypeRepository {
	findOne(id): AnimalType | undefined {
		return id ? animalTypeStub() : undefined;
	}
	find(): AnimalType[] {
		return [animalTypeStub()];
	}
	create(instance): AnimalType {
		return instance;
	}
	save(): AnimalType {
		return animalTypeStub();
	}
	update(id: number, dto: any): AnimalType {
		return animalTypeStub();
	}
	delete(id: number): AnimalType {
		return animalTypeStub();
	}
}
