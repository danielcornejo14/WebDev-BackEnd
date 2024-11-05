import dotenv from 'dotenv';
import { EcommerceServer } from './server/server';
import productRouter from './routes/product';


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

server.mountRoute('/products', productRouter);
server.start();

