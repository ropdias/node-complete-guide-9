const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorControler = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("62e06ca841e20e4a7819d41b")
    .then((user) => {
      // req.user = new User(user.name, user.email, user.cart, user._id);
      req.user = user; // This is a full mongoose model so we can call all methods directly on that user
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorControler.get404);

mongoose
  .connect(
    "mongodb+srv://node-user:nodecomplete@cluster0.p1tfc.mongodb.net/shop-mongoose?retryWrites=true&w=majority"
  )
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "Rodrigo",
          email: "test@test.com",
          cart: { items: [] },
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
