const express = require("express");
const cors    = require("cors");
require("dotenv").config();
const cloudinary = require('./cloudinary');

const eventsRouter   = require("./routes/events");
const teamRouter     = require("./routes/team");
const resultsRouter  = require("./routes/results");
const sponsorsRouter = require('./routes/sponsors');
const galleryRoutes = require("./routes/gallery");

const app  = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Fix
app.use(cors({
  origin: [
    "https://sankalan-2026.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/events",   eventsRouter);
app.use("/api/team",     teamRouter);
app.use("/api/results",  resultsRouter);
app.use("/api/sponsors", sponsorsRouter);
app.use("/api/gallery", galleryRoutes);
// Test Routes
app.get("/", (req, res) => {
  res.json({ message: "Sankalan 2026 API running!" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Sankalan 2026 API running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
