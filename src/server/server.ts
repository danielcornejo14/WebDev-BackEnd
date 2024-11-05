import express from 'express';
import cors from 'cors';
import { connectDB } from '../database';
// import dotenv from 'dotenv';

// dotenv.config();


export class EcommerceServer {

    private app!: express.Application
    private instance?: EcommerceServer;

    constructor() {
        if (this.instance) {
            return this.instance;
        }
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());

        connectDB();
        this.instance = this;
    }

    public start() {
        const port = process.env.PORT || 3000;
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }

    public mountRoute(route: string, router: express.Router) {
        this.app.use(route, router);
        console.debug(`Route mounted: ${route}`);
        return this;
    }

}