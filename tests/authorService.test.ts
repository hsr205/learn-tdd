import mongoose, {FilterQuery} from "mongoose";
import Author, {IAuthor} from "../models/author";


// TODO: Complete following test cases
describe('Verify retrieving author names and lifetimes sorted by author family name', () => {

    const authors = [{}];

    beforeAll(() => {
        Author.find = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("should return 'No authors found' when database is empty", async () => {
        const expected = authors.map(author => {
            const a = new Author(author);
            return `${a.name} : ${a.lifespan}`;
        });
        const testExpectation = authors.map(() => {
            return '';
        });
        (Author.find as jest.Mock).mockResolvedValueOnce(authors.map(author => new Author(author)));
        const result = await Author.getAllAuthors();
        console.log(`testExpectation = ${testExpectation}`)
        console.log(`result = ${result}`)
        expect(testExpectation).toStrictEqual(result);
    });

    // test("should return 'No authors found' when database is empty", () => {
    //     console.log(`Inside test method`)
    //     const author = new Author({});
    //     // author.family_name = 'Doe';
    //     // author.date_of_birth = new Date('1990-01-01');
    //     // author.date_of_death = new Date('2020-01-01');
    //     console.log(`author = ${author}`)
    //     const validationError = author.validateSync();
    //     console.log(`validationError = ${validationError}`);
    //     // expect(validationError).toBeDefined();
    //     // expect(validationError?.errors.first_name).toBeDefined();
    // });
    //
    // test("should return HTTP error code 500 when an error occurs", () => {
    //
    // });


});