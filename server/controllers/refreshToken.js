import UserAdmin from "../models/AdminModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.status(403).json({ msg: "No refresh token found" });

        const useradmin = await UserAdmin.findAll({
            where: {
                refresh_token: refreshToken
            }
        });

        if (!useradmin) return res.status(403).json({ msg: "Invalid refresh token" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ msg: "Invalid refresh token" });

            const adminId = useradmin.id;
            const name = useradmin.name;
            const email = useradmin.email;

            const accessToken = jwt.sign(
                { id: adminId, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "15s" }
            );

            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};