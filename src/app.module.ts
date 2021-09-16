import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalTypesModule } from './animal-types/animal-types.module';
import { AnimalsModule } from './animals/animals.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot(), AnimalTypesModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
