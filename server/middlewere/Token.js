import jwt from 'jsonwebtoken';

export const verifytoken = (req, res, next) => {
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(403).json({ message: "Token expired" }); // ✅ lebih spesifik
            } else {
                return res.status(403).json({ message: "Invalid token" });
            }
        }
        req.email = decoded.email;
        next();
    });
};