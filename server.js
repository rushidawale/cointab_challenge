const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const path = require("path")

const app = express();

var corsOptions = {
  origin: "http://localhost:8771"
};

app.get('/',function(req,res){
  console.log(__dirname)
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.get('/userdetails',function(req,res){
  res.sendFile(path.join(__dirname+'/userdetails.html'));
});

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8771;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
