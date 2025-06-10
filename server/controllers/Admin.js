import UserAdmin from "../models/AdminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserAdmin = async(req, res) => {
    try{
        const useradmin = await UserAdmin.findAll({
            attributes : ['id', 'name', 'email']
        });
        res.json(useradmin);
    }catch (error){
        console.log(error);
    }
}

export const Register = async (req, res) =>{
    const {name, email, password, confpassword} = req.body;
    if (password !== confpassword) return res.status(400).json({msg: "Passwords do not match"});
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    try{
        await UserAdmin.create({
            name: name,
            email: email,
            password : hashPass
        });
        res.json({msg: "Admin created successfully"});
    }catch (error){
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const admin = await UserAdmin.findOne({
            where: {
                email: req.body.email
            }
        });
        const isMatch = await bcrypt.compare(req.body.password, admin.password);
        if (!isMatch) return res.status(400).json({ msg: "Password salah" });

        const adminId = admin.id;
        const name = admin.name;
        const email = admin.email;

        const accessToken = jwt.sign({ adminId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({ adminId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1h'
        });

        await UserAdmin.update({ refresh_token: refreshToken }, {
            where: { id: adminId }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.json({ accessToken });
    } catch (error) {
        console.error(error); // log error detail ke server
        res.status(404).json({ msg: "Email tidak ditemukan" });
    }
}

export const Logout = async (req, res) =>{
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(204).json({ msg: "No containt" });
    const useradmin = await UserAdmin.findOne({
        where: {
             refresh_token: refreshToken
         }
    });
    if (!useradmin) return res.status(204).json({ msg: "No containt" });
    const adminId = useradmin.id;
    await UserAdmin.update({ refresh_token: null }, {
        where : { id : adminId }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}