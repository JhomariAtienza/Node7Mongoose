const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const errorController = require("./controllers/error");

const User = require("./models/user");

// const mongoConnect = require("./util/database").mongoConnect;
const mongoose = require('mongoose')

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("667dfff262796d15294af78b")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      next();
    });
});


app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use(errorController.get404);

  // const user = new User("roger", "roger@test.com", { items: [] });
  // user.save();
mongoose
  .connect("mongodb+srv://jhomari180:1Brh36jzzZtkx7j1@cluster0.b93ppg2.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
  .then(result => {
    app.listen(3000);
  })