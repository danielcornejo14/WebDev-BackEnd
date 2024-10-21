import dotenv from 'dotenv';
import { EcommerceServer } from './server/server';
import productRouter from './routes/product-routes';


dotenv.config();

const server: EcommerceServer = new EcommerceServer();
server.mountRoute('/products', productRouter);
server.start();

