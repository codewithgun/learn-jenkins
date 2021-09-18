import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
	async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}
		//In form post, all data will be string type, we can use transformer to change the type
		const object = plainToClass(metatype, value);
		const errors = await validate(object, {
			validationError: { target: false, value: false },
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
		});
		if (errors.length > 0) {
			throw new BadRequestException(Object.entries(errors.shift().constraints).shift()[1]);
		}
		return object;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}
}
