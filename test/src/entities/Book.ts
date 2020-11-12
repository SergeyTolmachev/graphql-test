import {
    Field, ObjectType, Int, ID,
} from 'type-graphql';
import Author from './Author';
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';

@Entity()
@ObjectType()
class Book {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    bookId: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field(() => Int)
    pageCount: number;

    @Column({ nullable: true })
    @Field(() => Int, { nullable: true })
    authorId?: number;

    @Field(() => Author, { nullable: true })
    author: Author;
}

export default Book;
