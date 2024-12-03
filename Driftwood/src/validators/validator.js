const {body} = require ("express-validator")

exports.uservalidators = {

        checkUserSignUp : function (){
            
            return[
                body("name")
                    .isString().withMessage("Invalid name")
                    .notEmpty().withMessage("name required")
                    .isLength({ min: 3 }).trim().withMessage("name cannot be less than 3 characters"),
                   
                body("email")
                    .isEmail().withMessage("Invalid Email")
                    .notEmpty().withMessage("email required"),

                body("phone_no")
                    .isNumeric().withMessage("Invalid phone number")
                    .isLength({ min: 11}).trim().withMessage("Phone no cannot be less than 11 numbers")
                    .notEmpty().withMessage("Phoneno Required"), 

                body("password")
                    .isString().withMessage("Invalid Password")
                    .isLength({ min: 6 }).trim()
                    .notEmpty().withMessage("Password Required")
            ]               
    },

        chekUserLogin : function(){
            return[
                body("email")
                .notEmpty().withMessage("Please Input Your Email"),

                body("password")
                .notEmpty().withMessage("Please Input Your Password")
            ]

    },

        validateEventFields : function() {
        return [
            body("name")
                .notEmpty().withMessage("Please input the event name")
                .isLength({ max: 100 }).withMessage("Event name can be at most 100 characters"),
    
            body("description")
                .notEmpty().withMessage("Please input a description for the event")
                .isLength({ max: 500 }).withMessage("Description can be at most 500 characters"),
    
            body("category")
                .notEmpty().withMessage("Please select a category for the event"),
    
            body("location")
                .notEmpty().withMessage("Please input the location for the event")
                .isLength({ max: 200 }).withMessage("Location can be at most 200 characters"),
    
            body("date")
                .notEmpty().withMessage("Please input the date for the event")
                .isDate().withMessage("Please enter a valid date in YYYY-MM-DD format"),
    
            body("time")
                .notEmpty().withMessage("Please input the time for the event")
                .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage("Please enter a valid time in HH:MM format")
        ];
    },
    
    
}