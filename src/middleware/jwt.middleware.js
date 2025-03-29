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
