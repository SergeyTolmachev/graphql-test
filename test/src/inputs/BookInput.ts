import {
    Field, Int, ID, InputType,
} from 'type-graphql';
import Book from '../entities/Book';

@InputType()
class BookInput implements Partial<Book> {
    @Field()
    name: string;

    @Field(() => Int)
    pageCount: number;

    @Field(() => Int, { nullable: true })
    authorId: number;
}

export default BookInput;
