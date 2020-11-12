import {
    Field, ID, InputType,
} from 'type-graphql';
import Author from '../entities/Author';

@InputType()
class AuthorInput implements Partial<Author> {
    @Field()
    name: string;
}

export default AuthorInput;
