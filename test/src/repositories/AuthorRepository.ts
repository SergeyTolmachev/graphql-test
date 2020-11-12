import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import Author from '../entities/Author';

@Service()
class AuthorRepository {
    getRepository() {
        return getRepository(Author);
    }
}

export default AuthorRepository;
