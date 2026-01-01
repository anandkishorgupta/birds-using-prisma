import express from 'express';
import authRoutes from "./routes/auth.routes.js";
import breedRoutes from "./routes/breed.routes.js";
import hatcheryRoutes from "./routes/hatchery.routes.js";


const app = express();
const port = 3000;



// Middleware
app.use(express.json()); // parse JSON requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded requests
BigInt.prototype.toJSON = function () {
  return this.toString();
};


// Mount all routes

app.use("/api/auth", authRoutes);
app.use("/api/breeds", breedRoutes);
app.use("/api/hatcheries", hatcheryRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});