// server/app.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// Serve main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
