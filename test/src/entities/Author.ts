import {
    Field, ObjectType, ID,
} from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class Author {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    authorId: number;

    @Column()
    @Field()
    name: string;
}

export default Author;
