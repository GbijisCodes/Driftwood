const {User , Event} = require('../models/association')


exports.Usercontrollers = {
    async getUserByID(req, res, next){
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                req.session.currentUser = user.toJSON();
                 next()
            } else {
                res.status(404).send('User not found');
            }
        } catch (error) {
            res.status(500).send('Error retrieving user');
        }
    }
,
    // Route to get all confirmed RSVPs for a specific user
    async getUseRSVP (req, res, next){
    const { id } = req.params;
    console.log(req.params)

    try {
        // Find all RSVPs for the user where status is 'confirmed' and include event details
        const user = await User.findByPk(id, {
            include: {
                model: Event,
                through: { where: { status: 'confirmed' } }, // Only include confirmed RSVPs
                attributes: ['id', 'name', 'description', 'date', 'location', 'category' , 'photo_path' , 'time'], // Event attributes to return
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract events from the user object
        const confirmedEvents = user.Events;
        req.session.RSVP = confirmedEvents
        next()
    } catch (error) {
        console.error('Error fetching confirmed RSVPs:', error);
        res.status(500).json({ message: 'Server error' });
    }
  },
  async checkuserlogin(req,res,next){
    if(req.session.formData){
      next();
    }else{
      res.redirect("/login")
    }
   // return next()
  }

}