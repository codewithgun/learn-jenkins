import { Animal } from '../entities/animal.entity';
import { animalStub } from '../test/stub/animal-stub';

export class AnimalRepository {
	save(): Animal {
		return animalStub();
	}
	create(instance) {
		return instance;
	}
	findOne(id): Animal | undefined {
		return id ? animalStub() : undefined;
	}
	find(): Animal[] {
		return [animalStub()];
	}
	update(id: number, dto: any): Animal | undefined {
		return id ? animalStub() : undefined;
	}
	delete(): boolean {
		return true;
	}
}
