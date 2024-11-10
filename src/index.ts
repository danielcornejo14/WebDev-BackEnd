import dotenv from 'dotenv';
import { EcommerceServer } from './server/server';
import productRouter from './routes/product';
import cartRouter from './routes/cart';
import userRouter from './routes/users';
import orderRouter from './routes/orders';


dotenv.config();


/**
 * TODO:
 * - Autentication
 * - Gestion de usuarios
 * - Gestion productos
 * - Carrito de compras
 * - Pedidos
 * - Proceso de pagos
 * - Gestion de inventario
 */

const server: EcommerceServer = new EcommerceServer();

server.mountRoute('/cart', cartRouter)
    .mountRoute('/users', userRouter)
    .mountRoute('/orders', orderRouter)
    .mountRoute('/product', productRouter)
server.start();

