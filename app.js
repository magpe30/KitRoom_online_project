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
app.set('views', path.join(__dirname, 'views'))

app.get ('/', (req, res) =>{
    res.render("home");
})

app.get('/makeproduct', async (req,res) =>{
    const prod = new Product({
        title: "Canon lens 10-18",
        description: "I'm lending a Canon lens EFS 10-18mm f/4.5-5.6"
    });
    await prod.save();
    res.send(prod)
})



app.listen(3000, () => {
    console.log("serving on port 3000!");
})