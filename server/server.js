require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth-routes/index");
const mediaRoutes = require("./routes/instructor-routes/media-routes");
const instructorCourseRoutes = require("./routes/instructor-routes/course-routes");
const studentViewCourseRoutes = require("./routes/student-routes/course-routes");
const studentViewOrderRoutes = require("./routes/student-routes/order-routes");
const studentCoursesRoutes = require("./routes/student-routes/student-courses-routes");
const studentCourseProgressRoutes = require("./routes/student-routes/course-progress-routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI; 

// Middleware configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB is connected successfully."))
  .catch((e) => console.log(`MongoDB connection error: ${e}`));

// ⭐ FIXED: Applying the /api prefix to match frontend requests
app.use("/api/auth", authRoutes); 
app.use("/api/media", mediaRoutes);
app.use("/api/instructor/course", instructorCourseRoutes);
app.use("/api/student/course", studentViewCourseRoutes);
app.use("/api/student/order", studentViewOrderRoutes);
app.use("/api/student/courses-bought", studentCoursesRoutes);
app.use("/api/student/course-progress", studentCourseProgressRoutes);

// Generic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.statusCode || 500; 
  res.status(status).json({
    success: false,
    message: err.message || "Something went wrong on the server.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
