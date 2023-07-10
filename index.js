import bodyParser from "body-parser";
import express from "express";
import mongoose, { mongo } from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv"


dotenv.config();
const app = express();
mongoose.connect(process.env.CONNECTION_STRING);
mongoose.pluralize(null);
const task = mongoose.model("t", {
  _id: Number,
  name: String,
  desc: String,
  date: String,
});

app.use(cors());
app.use(express.static("src"));
app.use(bodyParser.json());
app.post("/api/senddata", bodyParser.json(), (req, res) => {
  console.log(req.body);
  new task(req.body).save().then((d) => {
    console.log(d);
  });
});
app.post("/api/getdata", bodyParser.json(), (req, res) => {
  task.find().then((result) => res.send(result));
});
app.put("/api/patch", bodyParser.json(), (req, res) => {
  console.log(req.body);
  task.findOneAndReplace({ _id: req.body._id }, req.body).then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.listen(process.env.PORT | 3001, () => {
  console.log("Works!");
  console.log(`listening on port : ${process.env.PORT}`);
});
