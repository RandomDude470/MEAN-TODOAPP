import bodyParser from "body-parser";
import express from "express";
import mongoose, { mongo } from "mongoose";
import { dirname } from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/newdat");
mongoose.pluralize(null);
const task = mongoose.model("t", {
  _id: Number,
  name: String,
  desc: String,
  date: String,
});
const __dirname = dirname(fileURLToPath(import.meta.url));

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

app.listen(3001, () => {
  console.log("Works!");
});
