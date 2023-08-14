import express from 'express';
import productRouter from './routes/product.router';
import orderRouter from './routes/order.router';

const app = express();

app.use(express.json());

app.use('/orders', orderRouter);
app.use('/products', productRouter);

export default app;
