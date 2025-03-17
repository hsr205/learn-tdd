import express, {Response} from 'express';
import Author from '../models/author';

const router = express.Router();

/**
 * @route GET /authors
 * @group Author
 * @returns an array of all authors sorted by family name
 * @returns an error message if no authors were found
 * or if there was an error processing the request
 */
router.get('/', async (_, res: Response) => {
    try {
        console.log("GET /authors endpoint hit");

        const data: string[] | null = await Author.getAllAuthors({ family_name: 1 });

        if (!data || data.length === 0) {
            return res.send('No authors found');
        }

        res.send(data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
