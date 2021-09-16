import { Module } from '@nestjs/common';
import { AnimalTypesService } from './animal-types.service';
import { AnimalTypesController } from './animal-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalType } from './entities/animal-type.entity';

@Module({
	imports: [TypeOrmModule.forFeature([AnimalType])],
	controllers: [AnimalTypesController],
	providers: [AnimalTypesService],
	exports: [AnimalTypesService],
})
export class AnimalTypesModule {}
