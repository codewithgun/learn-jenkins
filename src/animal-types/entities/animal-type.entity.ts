import { ApiProperty } from '@nestjs/swagger';
import { Animal } from 'src/animals/entities/animal.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnimalType {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty()
	@Column()
	name: string;

	@ApiProperty()
	@Column()
	description: string;

	@ApiProperty()
	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => Animal, (animal) => animal.animalType)
	animals: Animal[];
}
