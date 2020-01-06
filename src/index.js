const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

require("./controllers/AuthController")(app);
require("./controllers/CategorieController")(app);
require("./controllers/BillingController")(app);
require("./controllers/PaymentController")(app);

app.listen(3000);
