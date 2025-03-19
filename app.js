import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.routes.js';
import { checkConnection } from './functions/db.functions.js';
import buyerRouter from './routes/buyer.routes.js';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: './.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');

checkConnection();

app.use('/api/user', userRouter);
app.use('/api/buyer', buyerRouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
});

app.get("/buyer", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "buyer.html"));
});

app.listen(3000, () => {
    console.log("Server started on Port 3000");
});