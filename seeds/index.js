const mongoose = require('mongoose');
const Product = require('../models/product');
const areas = require('./areas');
const {descriptors} = require('./seedHelpers')

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDb = async() => {
    await Product.deleteMany({});
    for (let i=0; i<9; i++){
        const random = Math.floor(Math.random() * 10);
        const price = Math.floor(Math.random() * 50) + 10  
        const prod = new Product ({
            location: `${areas[random].city}, ${areas[random].area}`,
            title: `${sample(descriptors)}`,
            image: 'https://source.unsplash.com/collection/362271',
            description: "here is my barley used canon, with lens, battery and charger. Everything for only 5 pounds per day",
            price
        })
        await prod.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});