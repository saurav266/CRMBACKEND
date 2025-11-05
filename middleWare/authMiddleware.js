import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token; // ✅ Read token from cookie

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }else{
      res.json({ success: true, user: decoded });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error in verifyUser", error: error.message });
  }
};