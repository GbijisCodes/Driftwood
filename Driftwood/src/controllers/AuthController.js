const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.AuthController = {

    async signUp(req,res){
            const { name, email, phone_no, password, userRole } = req.body;
          
            try {
              const existingUser = await User.findOne({ where: { email } });
              if (existingUser) {
                req.session.errors = [{ msg: 'Email is already registered' }]
                return res.redirect('/signup');
              }
          
              await User.create({ name, email, phone_no, password, userRole });
              res.redirect('/login');
            } catch (error) {
              req.session.errors = [{ msg: 'Error creating user' }];
              res.redirect('/signup');
            }
    },

    async login(req, res) {
      const { email, password } = req.body;
  
      try {
          const user = await User.findOne({ where: { email: email } });
          if (!user) {
          req.session.errors = [{msg :'Invalid email or password'}]; 
          return res.redirect('/login');
      }
          console.log(user.email , "yooooo")
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
          req.session.errors = [{msg :'Invalid email or password'}]; 
          return res.redirect('/login');
      }
          
         req.session.formData = user
          if (user.userRole === 'Student') {
              return res.redirect('/events'); 
          }  else if (user.userRole === 'Admin') {
              return res.redirect('/create-events'); 
          } else {
            req.session.errors = [{msg :'Unauthorized user role'}]; 
              return res.redirect('/login'); 
      }
  
      } catch (error) {
          req.session.errors = [{msg :'Error logging in'}];
          res.redirect('/login'); 
  }
  }
  
}