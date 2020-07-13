var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var uuid = require("uuid");
const mongoose = require('mongoose');
const path = require("path");
var router = express.Router();
const fileUpload = require("express-fileupload");
const Users = require("./modals/Users");
const db = require('./config/keys').mongoURI;


// MIDDLEWARES
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); //  "public" off of current is root

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", function (req, res) {
  res.render("index");
});

//MIDDLEWARES ENDS here

// DB CONN
// Connect to mongo
mongoose.connect(db)
    .then(() => {
        console.log("DB connected")
    })
    .catch(err => console.log(err));



app.post("/", async (req, res) => {
  var uid = uuid.v1();
  var name = req.body.name;
  var email = req.body.email;
  var resume = uid;
  var position = req.body.position;
  var qualification = req.body.qualification;
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let resume_file = req.files.resume;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      resume_file.mv("./uploads/" + uid + ".pdf");

      const newUser = new Users({
        name: name,
        email: email,
        resume: resume,
        position: position,
        qualification: qualification
      });

      newUser.save().then((users) => console.log("sent"));
      res.render('completed', {
        name: name
      })
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, "0.0.0.0", function () {
  console.log("Listening on Port 3000");
});
