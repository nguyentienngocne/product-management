const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT;
// Override Method
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Connect Database
const database = require("./config/database");
database.connect();

// Bodyy-parse
app.use(bodyParser.urlencoded({ extended: false }));

// Embed static file
app.use(express.static(`${__dirname}/public`));

// Template engine
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);

// Flash
app.use(cookieParser("NGUYENTIENNGOC"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Route
const routeAdmin = require("./routes/admin/index.route");
const routeClient = require("./routes/client/index.route");
routeAdmin(app);
routeClient(app);

// App locals Variables
const systemConfig = require("./config/system");
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
