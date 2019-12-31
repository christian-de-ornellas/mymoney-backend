const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

require("./controllers/AuthController")(app);
require("./controllers/CategorieController")(app);
require("./controllers/BillingController")(app);

app.listen(3000);
