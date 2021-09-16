import { AnimalType } from 'src/animal-types/entities/animal-type.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@ManyToOne(() => AnimalType, (animalType) => animalType.animals)
	animalType: AnimalType;

	@Column()
	animalTypeId: number;
}
