import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

export const authorize = async (req, res, next) => {
  try {
    let token;

    // 1. Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user and attach to request object
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    req.user = user; // Ab aap kisi bhi route mein req.user use kar sakte hain
    next(); // Agle function (controller) par jao
  } catch (error) {
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid token', error: error.message });
  }
};