const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/fitnesst17", 
  {
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!');
});

// routes
app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes.js"));

//lets me know if the port is listening 
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});