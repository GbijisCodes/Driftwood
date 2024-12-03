//importing the express package and other packages
const express = require("express");

// importing the package for paths
const path = require("path");

//importing the package that allows you get inputs from input fields
const bodyParser = require("body-parser");

// importing the package for file paths
const fs = require("fs");

const session = require("express-session");
const { AuthController } = require("./src/controllers/AuthController");
const { init } = require("./src/models/dbconfig");
const { uservalidators } = require("./src/validators/validator");
const { validationResult } = require("express-validator");
const { Eventcontroller } = require("./src/controllers/EventController");
const upload = require("./src/models/multer");
const { Usercontrollers } = require("./src/controllers/UserController");
const RSVP = require("./src/models/RSVP");
const Event = require("./src/models/events");
const User = require("./src/models/user");


//instantiating the express function
const app = express();
init()

//linking ejs
app.set("views", "./src/views");

app.set("view engine", "ejs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//Allows You To Use The BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//Serving The Static files(images, styles etc)
app.use(express.static("public"));
//Serving The Uploaded Files
const uploadPath = path.join(__dirname,'src/models/uploads')
app.use(express.static(uploadPath));


//Getting The Home page And Other Pages using ejs
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
    console.log(req.session.errors, "heyyyy")
    const errors = req.session.errors || [];
    
    delete req.session.errors;
    
    res.render("login" , {errors});
  });

app.get("/events",Usercontrollers.checkuserlogin, Eventcontroller.getEvents, (req, res) => {
  const events = req.session.events || [];
  const formData = req.session.formData || {};

  delete req.session.events
 
  res.render("events", {events , formData});
});

app.get("/create-events", Usercontrollers.checkuserlogin, Eventcontroller.getEvents, (req, res) => {
  console.log(req.session.errors, "heyyyy")
  const errors = req.session.errors || [];
  const events = req.session.events || [];
  delete req.session.errors;
  delete req.session.events
  res.render('createevent', { errors , events});
  
});

app.get("/signup", (req, res) => {
    console.log(req.session.errors, "heyyyy")
    const errors = req.session.errors || [];
    const formData = req.session.formData || {};
    delete req.session.errors;
    delete req.session.formData;
    res.render('signup', { errors, formData });
});

app.get('/profile/:id', Usercontrollers.checkuserlogin,
   Usercontrollers.getUserByID, Usercontrollers.getUseRSVP, (req, res) => {
  const currentUser = req.session.currentUser || [];
  const RSVP = req.session.RSVP || [];
  delete req.session.currentUser;

  res.render('profile', {currentUser, RSVP})
  
});





// RSVP route using GET request with query parameters
app.get('/rsvp', async (req, res) => {
    const { userId, eventId } = req.query;
      console.log(req.query.userId)
    try {
        // // Ensure both user and event exist
        // const user = await User.findByPk(userId);
        // const event = await Event.findByPk(eventId);

        if (!User || !Event) {
            return res.status(404).send('User or Event not found');
        }

        // Create the RSVP record
        await RSVP.create({ UserId: userId, EventId: eventId, status: 'confirmed' });

        // Redirect back to the event or user profile
        res.redirect(`/profile/${userId}`);
    } catch (error) {
        console.error('Error creating RSVP:', error);
        res.status(500).send('Error processing RSVP');
    }
});




 app.post("/signup", uservalidators.checkUserSignUp(),
 (req,res,next)=>{
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.session.errors = errors.array(); 
      req.session.formData = req.body;     
      return res.redirect('/signup'); 
  }
  next();
  
},AuthController.signUp) 

app.post("/login", uservalidators.chekUserLogin(),
 (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.session.errors = errors.array(); 
      req.session.formData = req.body;     
      return res.redirect('/login'); 
  }
  next();
  
},AuthController.login) 

app.post("/create-event", upload.single('photo'), uservalidators.validateEventFields(),
 (req,res,next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      req.session.errors = errors.array(); 
      req.session.formData = req.body;     
      return res.redirect('/create-events'); 
  }
  next();
  
},Eventcontroller.createEvent) 








//Using Express Session
app.set("trust proxy", 1); // trust first proxy


//Setting The Server Port
var server = app.listen(6100, () => {
  console.log("Here We Go Baby!");
});