import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import Book from '../entities/Book';

@Service()
class BookRepository {
    getRepository() {
        return getRepository(Book);
    }
}

export default BookRepository;
