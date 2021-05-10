if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/yelp-camp";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection
  .once("open", () => {
    console.log("mongoDB database connection established");
  })
  .on("error", (err) => {
    console.log("Error: ", err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6098175309d8a5181cae1a71",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error quia nisi mollitia ipsa aliquid sit quae velit libero? Vitae eius beatae aspernatur nemo nobis eveniet quas ex. Nulla, culpa dolor. Quas vitae in magnam nostrum eaque, aperiam quis blanditiis tenetur, perferendis ex veniam, nihil perspiciatis sunt aspernatur eum. Praesentium iure expedita voluptate, aperiam aut labore eos consequuntur ex dolor ipsam!",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dewrq9fc8/image/upload/v1616453496/YelpCamp/m6rqnbdliyzrgwdfb5p3.jpg",
          filename: "YelpCamp/m6rqnbdliyzrgwdfb5p3",
        },
        {
          url: "https://res.cloudinary.com/dewrq9fc8/image/upload/v1616453496/YelpCamp/ghaiw3fll5c0vyvusjkm.jpg",
          filename: "YelpCamp/ghaiw3fll5c0vyvusjkm",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
