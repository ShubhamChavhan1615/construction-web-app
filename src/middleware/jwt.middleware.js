// import jwt from "jsonwebtoken";

// export const jwtauthmiddleware = (req, res, next) => {
//     // Get token from cookies
//     const token = req.cookies.authToken; // Make sure you set this cookie

//     if (!token) {
//         return res.status(400).json({ message: "Token is missing" });
//     }

//     try {
//         // Verify token
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded; // Store decoded user data in req.user
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };
import jwt from  "jsonwebtoken"

export const checkAuth = (req, res, next) => {
  const token = req.cookies.authToken; // Get token from cookies

  if (token) {
    try {
      const verified = jwt.verify(token, process.env.SECRET_KEY); // Verify JWT
      req.user = verified; // Store user info in request
    } catch (err) {
      res.clearCookie("authToken"); // Clear invalid token
      req.user = null; // Ensure user is null if the token is invalid
    }
  } else {
    req.user = null; // No token means user is not authenticated
  }
  
  next(); // Proceed to the next middleware/route
};
