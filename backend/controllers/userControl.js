const Users = require('../models/userModel');

const userControl = {
    signup: async (req, res) => {
        try {
            const { name, email, password, DOB } = req.body;

            // Check if user already exists
            const user = await Users.findOne({ email });
            if (user) return res.status(400).json({ msg: "Email already registered" });

            // Check password length
            if (password.length < 6) {
                return res.status(400).json({ msg: "Password must be at least 6 characters" });
            }

            // Create new user
            const newUser = new Users({
                name,
                email,
                password,
                DOB
            });

            // Save user to database
            await newUser.save();

            res.json({ msg: "Register success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = userControl;
