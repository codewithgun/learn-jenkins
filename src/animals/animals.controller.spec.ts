import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';

describe('AnimalsController', () => {
	let controller: AnimalsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AnimalsController],
			providers: [
				{
					provide: AnimalsService,
					useValue: jest.fn().mockReturnValue({}),
				},
			],
		}).compile();

		controller = module.get<AnimalsController>(AnimalsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
