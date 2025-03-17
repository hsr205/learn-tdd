import mongoose from "mongoose";
import Author from "../models/author";
import request from "supertest";
import app from "../server";


describe('Verify retrieving author names and lifetimes sorted by author family name', () => {

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


});