import dotenv from 'dotenv';
import { EcommerceServer } from './server/server';
import productRouter from './routes/product';
import cartRouter from './routes/cart';
import userRouter from './routes/users';
import orderRouter from './routes/orders';
import categoryRouter from './routes/category';
import reviewRouter from './routes/review';


dotenv.config();


const server: EcommerceServer = new EcommerceServer();

server.mountRoute('/cart', cartRouter)
    .mountRoute('/users', userRouter)
    .mountRoute('/orders', orderRouter)
    .mountRoute('/product', productRouter)
    .mountRoute('/category', categoryRouter)
    .mountRoute('/review', reviewRouter)
server.start();

