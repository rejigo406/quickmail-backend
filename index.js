const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const mailRoutes = require('./routes/mailRoutes');
app.use('/api', mailRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

// Other routes here
app.get("/", (req, res) => {
  res.send("✅ QuickMail Backend is Live!");
});

// Server start
app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
