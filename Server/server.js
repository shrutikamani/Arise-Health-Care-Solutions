import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors'
import { createAdmin } from './scripts/createAdmin.js';
import userRouter from './routes/user.js';
import adminRouter from "./routes/admin.js";
import blogRouter from './routes/blog.js';
import productRouter from './routes/product.js';
import featureRouter from './routes/feature.js';
import addressRouter from './routes/address.js';
import paymentRouter from './routes/payment.js';
import orderRouter from './routes/order.js';
import ProductQuestionRouter from './routes/productQuestion.js'
import megaMenuRouter from './routes/megaMenu.js';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT','PATCH', 'DELETE'], 
    allowedHeaders: ["Content-Type"],
    credentials: true, 
  })
);

app.use(express.json());

const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static("uploads"));

app.use('/appointment', userRouter);
  
app.use('/expert', adminRouter);

app.use('/blog', blogRouter);

app.use('/product', productRouter);

app.use('/productQuestion', ProductQuestionRouter);

app.use('/feature', featureRouter);

app.use('/address', addressRouter);

app.use('/payment', paymentRouter);

app.use('/order', orderRouter);

app.use('/mega-menu',megaMenuRouter );

const PORT = 3030;

mongoose
  .connect("mongodb://127.0.0.1:27017/HealthCare")
  .then(async () => {
    console.log("MongoDb Connected Successfully...!");

    await createAdmin();

    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));