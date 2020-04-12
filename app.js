const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

let hbs = exphbs.create({
  defaultLayout: "main",
  helpers: {
    ifEquals: function(arg1, arg2, options) { if (arg1 == arg2) {return options.fn(this)} return options.inverse(this); },
    ifNotEquals: function(arg1, arg2, options) { if (arg1 != arg2) {return options.fn(this)} return options.inverse(this); }
  }
})

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret: "Finger lickin' good!",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*10}
}));

app.engine("handlebars", exphbs(hbs));
app.set("view engine", "handlebars");
// app.set('view engine', 'pug');
app.set('views','./views');

configRoutes(app);

app.listen(3000, () => {
  console.log("MediDesk server up and running...");
  console.log("Your routes will be running on http://localhost:3000");
});
