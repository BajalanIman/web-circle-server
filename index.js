const express = require("express");
const cors = require("cors");
const products = require("./src/data/places.json");
const dotenv = require("dotenv");
// const prisma = require(".db/prisma");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://f24-web-circle-berlin.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/places/:id", (req, res) => {
  const placeId = parseInt(req.params.id);
  const place = products.find((p) => p.id === placeId);

  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ error: `Place with ID ${placeId} not found.` });
  }
});

app.post("/savePlace", (req, res) => {
  const { placeId } = req.body;
  console.log(`Received place ID: ${placeId}`);
  res.json({
    success: true,
    message: `Place ID ${placeId} saved successfully`,
  });
});

// import Routes
const placesRoutes = require("./routes/places");
const destinationsRoutes = require("./routes/destinations");
const searchedPlacesRoutes = require("./routes/searchedPlaces");
const bookingsRoutes = require("./routes/bookings");

// Use Routes
app.use("/places", placesRoutes);
app.use("/destinations", destinationsRoutes);
app.use("/s", searchedPlacesRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(PORT, (error) => {
  if (error) console.log("Error starting the server:", error);
  else console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
