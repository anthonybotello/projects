const express = require('express');
const app = express();

//Settings
require('./settings')(app);

//Routes
require('./routes')(app);

//Port Number
app.listen(5001);
