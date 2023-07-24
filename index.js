import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import routes from "./routes/soccerRoutes.js";

const app = express();
const PORT = 4000;

// mongo connection
mongoose.Promise = global.Promise;
const mongoDatabaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.mongoDatabaseUrl
    : "mongodb://localhost/soccerDB";

mongoose.connect(mongoDatabaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);

app.get("/", (req, res) =>
  res.send(`Our Soccer application is running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Your soccer server is running on port ${PORT}`)
);
