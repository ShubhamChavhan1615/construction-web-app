// import jwt from "jsonwebtoken";

// export const jwtauthmiddleware = (req, res, next) => {
//     const authorization = req.cookice;

//     if (!authorization) {
//         return res.status(400).json({ message: "Authorization header is missing" });
//     }

//     const token = authorization.split(" ")[1];

//     if (!token) {
//         return res.status(400).json({ message: "Token is missing" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };


import jwt from "jsonwebtoken";

export const jwtauthmiddleware = (req, res, next) => {
    // Get token from cookies
    const token = req.cookies.authToken; // Make sure you set this cookie

    if (!token) {
        return res.status(400).json({ message: "Token is missing" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded; // Store decoded user data in req.user
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
