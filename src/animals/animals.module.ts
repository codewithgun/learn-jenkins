import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsController } from './animals.controller';
import { AnimalsService } from './animals.service';
import { Animal } from './entities/animal.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Animal])],
	controllers: [AnimalsController],
	providers: [AnimalsService],
	exports: [AnimalsService],
})
export class AnimalsModule {}
