const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./index.html"))
);


app.listen(PORT, () =>
  console.log(`Hnefatafl app is listening at http://localhost:${PORT}`)
);