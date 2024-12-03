const Event = require("../models/events");
const { Op } = require('sequelize')

exports.Eventcontroller = {
    async createEvent(req, res) {
        const { name, description, category, location, date, time } = req.body;
        const photo_path = req.file.filename

        try {
            await Event.create({ name, description, category, location, date, time, photo_path });
            res.redirect('/events'); 
        } catch (error) {
            console.error('Error creating event:', error);

            req.session.errors = 'Error creating event. Please try again.';
            res.redirect('/create-events'); 
        }
    },

    async getEvents(req, res, next) {
        const { filter, category } = req.query;
        const today = new Date();
        let dateFilter = {};
        let categoryFilter = {};
    
        switch (filter) {
            case 'today':
                dateFilter = { date: today };
                break;
            case 'tomorrow':
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                dateFilter = { date: tomorrow };
                break;
            case 'this_week':
                const weekEnd = new Date();
                weekEnd.setDate(today.getDate() + 7);
                dateFilter = { date: { [Op.between]: [today, weekEnd] } };
                break;
            default:
                dateFilter = {};
                break;
                
        }
            if (category) {
                categoryFilter = { category: category };
            }

        try {
            // Fetch all events from the database
            const events = await Event.findAll({
                where: {
                    ...dateFilter,
                    ...categoryFilter,
                },
            });

            // Render the events page, passing the list of events
            req.session.events = events
            // console.log(events)
            next();
            // res.redirect('events');
        } catch (error) {
            console.error('Error fetching events:', error);

            // Store an error message in the session and redirect to an error page or display it in the events page
            req.session.errors = 'Error fetching events. Please try again later.';
            res.redirect('/error'); // Adjust this route as needed
        }
    }
};
