import {
    Resolver,
    Arg,
    Mutation,
    ResolverInterface,
    Root,
    Query, FieldResolver,
} from 'type-graphql';

import { getCustomRepository, Repository } from 'typeorm';
import Book from '../entities/Book';
import BookInput from '../inputs/BookInput';
import Author from '../entities/Author';
import BookRepository from '../repositories/BookRepository';
import AuthorRepository from '../repositories/AuthorRepository';

@Resolver(Book)
class BookResolver implements ResolverInterface<Book> {
    private bookRepository: Repository<Book>;
    private authorRepository: Repository<Author>;

    private authors: Author[] = [];

    constructor(bookRepository: BookRepository, authorRepository: AuthorRepository) {
        this.bookRepository = bookRepository.getRepository();
        this.authorRepository = authorRepository.getRepository();
    }

    async getAuthors(): Promise<void> {
        this.authors = await this.authorRepository.find();
    }

    @Query(() => [Book])
    async books():Promise<Book[]> {
        await this.getAuthors();

        return this.bookRepository.find();
    }

    @Mutation(() => Book)
    async addBook(@Arg('book') book: BookInput): Promise<Book> {
        return this.bookRepository.save(book);
    }

    @FieldResolver(() => Author, {})
    async author(@Root() book: Book): Promise<Author> {
        return this.authors.find(author => author.authorId === book.authorId);
    }
}

export default BookResolver;
