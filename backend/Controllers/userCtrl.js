const User = require("../DBmodels/userModel");
const bcrypt = require("bcryptjs");
const sendToken = require("../Utils/jwtToke");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      console.log(req.body);
      if (!name || !email || !password) {
        return res.json({ error: "Please fill in all fields." });
      }

      if (!validateEmail(email)) {
        return res.json({ error: "Invalid email." });
      }
      if (phone && !validatePhoneNumber(phone)) {
        return res.json({ error: "Invalid mobile number." });
      }
      const user = await User.findOne({ email });
      if (user) return res.json({ error: "This email already exists." });

      if (password.length < 6)
        return res.json({ error: "Password must be at least 6 characters." });

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({
        name,
        email,
        password: passwordHash,
        phone,
      });
      await newUser.save();
      sendToken(newUser, 201, res, "Register Successfull!");
    } catch (err) {
      return res.json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ error: "Please fill in all fields." });
      }
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.json({ error: "This email does not exist" });
      }

      const isPasswordMatched = await user.comparePassword(password);
      if (!isPasswordMatched) {
        return res.json({ error: "Password is incorrect." });
      }
      console.log("hello dear");
      // save cookies to browser
      sendToken(user, 200, res, "Login success.");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("jwtToken");
      return res.status(200).json({ msg: "Logged out." });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

module.exports = userCtrl;
