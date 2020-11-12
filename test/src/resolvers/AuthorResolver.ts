import {
    Resolver,
    Arg,
    Mutation,
    ResolverInterface,
} from 'type-graphql';
import { Service } from 'typedi';
import { getCustomRepository, Repository } from 'typeorm';

import Author from '../entities/Author';
import AuthorInput from '../inputs/AuthorInput';
import AuthorRepository from '../repositories/AuthorRepository';

@Service()
@Resolver(Author)
// @ts-ignore
class AuthorResolver implements ResolverInterface<Author> {
    private authorRepository: Repository<Author>;

    constructor(authorRepository: AuthorRepository) {
        this.authorRepository = authorRepository.getRepository();
    }

    @Mutation(() => Author)
    async addAuthor(@Arg('author') author: AuthorInput): Promise<Author> {
        return this.authorRepository.save(author);
    }
}

export default AuthorResolver;
