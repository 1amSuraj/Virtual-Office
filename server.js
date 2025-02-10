const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/user');  // Import authentication routes
const departmentRoutes = require('./routes/department');  // Import department routes
const io = require("socket.io")(4000, {
  cors: { origin: "*" }
});

let activeScreenStream = null; // Store the active screen-sharing stream

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When an employee starts sharing their screen
  socket.on("start-screen-share", (streamId) => {
    activeScreenStream = streamId; // Save the stream ID
    io.emit("screen-share-started", streamId); // Notify others
  });

  // When an employee stops screen sharing
  socket.on("stop-screen-share", () => {
    activeScreenStream = null;
    io.emit("screen-share-stopped");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    if (socket.id === activeScreenStream) {
      activeScreenStream = null;
      io.emit("screen-share-stopped");
    }
  });
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/department', departmentRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
