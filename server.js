const express =require('express');

const productRouter= require('./controles/product');
const userRouter = require('./controles/user');

require('./config/connect');


const app = express();

app.use(express.json());

app.use('/product', productRouter);
app.use('/user', userRouter);


app.listen(3000,()=>{
    console.log("server work");
});


