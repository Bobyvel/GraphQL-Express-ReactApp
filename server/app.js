const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin request
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mern-shoping-list");
mongoose.connection.once("open", () => console.log("Conected to the database"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
