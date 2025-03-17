import Author from "../models/author";
import request from "supertest";
import app from "../server";


describe('Verify retrieving author names and lifetimes sorted by author family name', () => {

    const mockAuthors = [
        {
            first_name: 'John',
            family_name: 'A',
            date_of_birth: new Date('1900-01-01'),
            date_of_death: new Date('2020-01-01')
        },
        {
            first_name: 'Jane',
            family_name: 'B',
            date_of_birth: new Date('1900-01-01'),
            date_of_death: new Date('2020-01-01')
        },

        {
            first_name: 'Jack',
            family_name: 'C',
            date_of_birth: new Date('1900-01-01'),
            date_of_death: new Date('2020-01-01')
        },
        {
            first_name: 'Jacklyn',
            family_name: 'D',
            date_of_birth: new Date('1900-01-01'),
            date_of_death: new Date('2020-01-01')
        }
    ];

    beforeAll(() => {
        Author.find = jest.fn();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should return a list of author names and lifetimes sorted by family name of the authors', async () => {
        const expected = mockAuthors.map(author => {
            const a = new Author(author);
            return `${a.name} : ${a.lifespan}`;
        });
        (Author.find as jest.Mock).mockResolvedValueOnce(mockAuthors.map(author => new Author(author)));
        const result = await Author.getAllAuthors();
        console.log(result)
        expect(expected).toStrictEqual(result);
    });

});

describe('Verify exception are thrown appropriately', () => {


    let consoleSpy: jest.SpyInstance;

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {
        });
    });

    afterAll(() => {
        consoleSpy.mockRestore();
    });

    it("should respond with `No authors found`", async () => {
        const expectedResponse = "No authors found"

        Author.getAllAuthors = jest.fn().mockResolvedValueOnce(null);

        const response = await request(app).get(`/authors`);

        expect(response.statusCode).toBe(200);
        expect(response.text).toStrictEqual(expectedResponse);
    });

    it("should respond with HTTP error code of 500", async () => {
        const expectedResponse = "Internal Server Error"

        Author.getAllAuthors = jest.fn().mockRejectedValueOnce(new Error("Database error"));

        const response = await request(app).get(`/authors`);

        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({error: expectedResponse});
    });


});