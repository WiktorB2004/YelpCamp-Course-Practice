//jshint esversion:9
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () =>{
    console.log('Databse connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6051123249e377509898f039', 
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim similique nam fugiat magni odio corrupti est quisquam laudantium hic, quibusdam id modi eius necessitatibus, qui quasi odit ipsa, molestiae ducimus.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dewrq9fc8/image/upload/v1616453496/YelpCamp/m6rqnbdliyzrgwdfb5p3.jpg',
                    filename: 'YelpCamp/m6rqnbdliyzrgwdfb5p3'
                },
                 {
                    url: 'https://res.cloudinary.com/dewrq9fc8/image/upload/v1616453496/YelpCamp/ghaiw3fll5c0vyvusjkm.jpg',
                    filename: 'YelpCamp/ghaiw3fll5c0vyvusjkm'
                }
            ]
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});