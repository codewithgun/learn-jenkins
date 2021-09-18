import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypesModule } from './animal-types/animal-types.module';
import { AnimalsModule } from './animals/animals.module';
import { AppService } from './app.service';

@Module({
	imports: [TypeOrmModule.forRoot(), AnimalTypesModule, AnimalsModule],
	providers: [AppService],
})
export class AppModule {}
