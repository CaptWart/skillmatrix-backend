const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors')

const PORT = process.env.PORT || 3001;
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Static directory
app.use(express.static("public"));
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

//Models, routes & middleware
const db = require("./models");
app.use(require('./routes/users'));
app.use(require('./routes/add'));
app.use(require('./routes/userSkills'));

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
