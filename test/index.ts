import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import * as path from 'path';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { Container } from 'typedi';

import AuthorResolver from './src/resolvers/AuthorResolver';
import BookResolver from './src/resolvers/BookResolver';

import Author from './src/entities/Author';
import Book from './src/entities/Book';

import wait from './src/helpers/wait';

const connect = async (retry = 1) => {
    try {
        console.log(`Попытка №${retry} подключения к базе`);
        await createConnection({
            type: 'mysql',
            database: process.env.MYSQL_DATABASE || 'test',
            username: process.env.MYSQL_USER || 'user',
            password: process.env.MYSQL_PASSWORD || 'password',
            port: Number(process.env.MYSQL_PORT) || 3306,
            host: process.env.MYSQL_HOST || 'localhost',
            entities: [Author, Book],
            synchronize: true,
        });
        console.log('Подключение установлено');
    } catch (error) {
        console.log('error', error);
        await wait(10);

        return connect(retry + 1);
    }
};

async function bootstrap() {
    await connect();

    const schema = await buildSchema({
        resolvers: [AuthorResolver, BookResolver],
        container: Container,
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    });

    const server = new ApolloServer({
        schema,
        playground: true,
    });

    const { url } = await server.listen(4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
