const express = require("express");
const cors    = require("cors");
require("dotenv").config();
const cloudinary = require('./cloudinary');

const eventsRouter  = require("./routes/events");
const teamRouter    = require("./routes/team");
const resultsRouter = require("./routes/results");
const sponsorsRouter = require('./routes/sponsors');

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/events",  eventsRouter);
app.use("/api/team",    teamRouter);
app.use("/api/results", resultsRouter);
app.use('/api/sponsors', sponsorsRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Sankalan 2026 API running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});