import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db_admin from './config/database_admin.js';
import router from './routes/UserAdminRoute.js';
import UserAdmin from './models/AdminModel.js';
import db_surat from './config/database_surat.js';
import DataSurat from './models/SuratModel.js';
import routerSurat from './routes/DataSuratRooute.js';

dotenv.config();
const app = express();

console.log("🚀 Starting server setup...");

try {
    console.log("🔄 Connecting to Database Persuratan...");
    await db_surat.authenticate();
    console.log("✅ Database Persuratan Connected");
    await DataSurat.sync({ alter: true });
    console.log("✅ UserAdmin table synced");
} catch (error) {
    console.error("❌ Failed to connect to database:", error);
}

//Jika kamu ingin aktifkan koneksi admin, pakai blok ini:
try {
    console.log("🔄 Connecting to Database Admin...");
    await db_admin.authenticate();
    console.log("✅ Database Admin Connected");

    // Untuk buat tabel baru dari model
    await UserAdmin.sync();
    console.log("✅ UserAdmin table synced");
} catch (error) {
    console.error("❌ Failed to connect to admin database:", error);
}

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(routerSurat);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running at port ${PORT}`);
});