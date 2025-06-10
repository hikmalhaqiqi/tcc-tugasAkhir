import express from 'express';
import { upload, getDataSurat, getDataSuratById, AddDataSurat, updateDataSurat, deleteDataSurat } from '../controllers/suratController.js';

const routerSurat = express.Router();

routerSurat.get('/DataSurat', getDataSurat);
routerSurat.get('/DataSurat/:id', getDataSuratById);
routerSurat.post('/add', upload.single("file_pendukung_url"), AddDataSurat);
routerSurat.patch('/update/:id', updateDataSurat);
routerSurat.delete('/DataSurat/:id', deleteDataSurat);

export default routerSurat;