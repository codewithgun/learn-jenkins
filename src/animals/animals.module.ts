import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Animal])],
	controllers: [AnimalsController],
	providers: [AnimalsService],
})
export class AnimalsModule {}
