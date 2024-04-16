import bcrypt from 'bcrypt';
import { User } from '../models/users.model.js';
import  jwt  from 'jsonwebtoken';
import { asynchandler } from '../middleware/asynchandler.js';

export const resgiterUser = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: " User already exists " });
    }
    const user = new User({ email, password: hashedpassword });
    await user.save();
    res.status(201).json({ message: ' User registered successfully ',user });
  } catch (error) {
    res.status(500).json({ error: ' Registration Failed ' });
  }
});

export const userLogin = asynchandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findById(email);
    if (!user) {
      res.status(401).json({ error: ' Authentication failed ' });
    }
    const passwordmatch = await bcrypt.compare(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({ error: ' Incorrect Password ' });
    }
    const token = jwt.sign({ email: user.email });
    res.status(200).json(token,user);
  } catch (error) {
    res.status(500).json({error: ' Internal Server Error '});
  }
});

