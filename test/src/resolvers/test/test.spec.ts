import 'reflect-metadata';
import { GraphQLSchema, graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import AuthorResolver from '../AuthorResolver';
import BookResolver from '../BookResolver';
import AuthorRepository from '../../repositories/AuthorRepository';
import BookRepository from '../../repositories/BookRepository';

const stubAuthor = {
    authorId: 1,
    name: 'Test',
};

const authorRepositoryMock = {
    getRepository: () => ({
        save: () => stubAuthor,
        find: () => [stubAuthor],
    }),
};

const stubBook = {
    bookId: 1,
    authorId: 1,
    name: 'book',
    pageCount: 30,
};

const bookRepositoryMock = {
    getRepository: () => ({
        save: () => stubBook,
        find: () => [stubBook],
    }),
};

describe('Test', () => {
    let schema: GraphQLSchema;

    beforeAll(async () => {
        schema = await buildSchema({
            resolvers: [AuthorResolver, BookResolver],
            validate: true,
            container: Container,
        });

        Container.set(AuthorRepository, authorRepositoryMock);
        Container.set(BookRepository, bookRepositoryMock);
    });

    describe('AuthorResolver', () => {
        it('addAuthor', async () => {
            const mutation = `mutation {
            addAuthor(author: {
            name: "author"
                }) {
                    name
                    authorId
                }
            }`;
            const result = await graphql(schema, mutation);

            expect(result).toEqual({
                data: {
                    addAuthor: {
                        authorId: '1',
                        name: 'Test',
                    },
                },
            });
        });
    });

    describe('BookResolver', () => {
        it('addBook', async () => {
            const mutation = `mutation {
            addBook(book: {
                name: "book"
                authorId: 1,
                pageCount: 30,
                }) {
                    name
                    authorId
                    bookId
                }
            }`;
            const result = await graphql(schema, mutation);

            expect(result).toEqual({
                data: {
                    addBook: {
                        authorId: 1,
                        name: 'book',
                        bookId: '1',
                    },
                },
            });
        });

        it('books without authors', async () => {
            const query = `query {
            books{
                    name
                    authorId
                    bookId
                }
            }`;
            const result = await graphql(schema, query);

            expect(result).toEqual({
                data: {
                    books: [{
                        authorId: 1,
                        name: 'book',
                        bookId: '1',
                    }],
                },
            });
        });

        it('books with authors', async () => {
            const query = `query {
            books{
                    name
                    authorId
                    bookId
                    author {
                        name
                        authorId
                    }
                }
            }`;
            const result = await graphql(schema, query);

            expect(result).toEqual({
                data: {
                    books: [{
                        authorId: 1,
                        name: 'book',
                        bookId: '1',
                        author: {
                            authorId: '1',
                            name: 'Test',
                        },
                    }],
                },
            });
        });
    });
});
