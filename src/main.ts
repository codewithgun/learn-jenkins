import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './periphery/exception-filter/global-exception-filter';
import { GlobalValidationPipe } from './shared/pipes/global-validation-pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder().setTitle('Animal World').setDescription('Welcome to the animal world').setVersion('1.0').addTag('animal_world').build();
	const document = SwaggerModule.createDocument(app, config);
	app.useGlobalFilters(new GlobalExceptionFilter());
	app.useGlobalPipes(new GlobalValidationPipe());
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}
bootstrap();
