const express = require("express");
const app = express();
const userRouter = require("./routes/UserRoutes");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");


const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
  res.send("Notes API Created by @codeguyakash!");
});
const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://master:jyHHCWkfqtEO40ON@cluster0.kdwj0.mongodb.net/notes_db?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
