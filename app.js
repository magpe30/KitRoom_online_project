const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/kitRoom', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log("Database connected");
})


const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true}));

app.get ('/', (req, res) =>{
    res.render("home");
});

app.get('/products', async (req, res) =>{
    const allProducts = await Product.find({});
    res.render('products/index', { allProducts });
});

app.get('/products/new', (req,res) =>{
    res.render('products/new');
});

app.post('/products', async(req,res) =>{
    const product = new Product(req.body.product);
    await product.save();
    res.redirect(`/products/${product._id}`)
})

app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', { product })
});

app.get('/products/:id/edit', async (req, res) =>{
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product })
})

app.listen(3000, () => {
    console.log("serving on port 3000!");
})