import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(GlobalExceptionFilter.name);
	catch(exception: Error, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		if (exception instanceof HttpException) {
			response.status(exception.getStatus()).json(exception.message);
		} else if (exception instanceof EntityNotFoundError) {
			response.status(HttpStatus.BAD_REQUEST).json(exception.message);
		} else {
			response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(exception.message);
		}
	}
}
