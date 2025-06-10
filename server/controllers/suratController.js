import DataSurat from "../models/SuratModel.js";
import multer from "multer";
import { uploadFileToGCS } from "../uploads/storage.js";

const storage = multer.memoryStorage();
export const upload = multer({ storage }); // middleware

export const getDataSurat = async (req, res) => {
    try {
        const response = await DataSurat.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error); // Cetak error ke konsol untuk debugging
        res.status(500).json({ msg: "Terjadi kesalahan pada server atau database kosong" });
    }
}

export const getDataSuratById = async (req, res) => {
    try {
        const response = await DataSurat.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Data surat tidak ditemukan" });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data surat" });
    }
}

export const AddDataSurat = async (req, res) => {
  try {
    let fileUrl = null;
    console.log("udah berhasil di let fileurl");
    if (req.file) {
      console.log("filenya udah ada");
      try {
        fileUrl = await uploadFileToGCS(req.file);
        console.log("url imgage di controller:", fileUrl);
      } catch (err) {
        console.error("❌ Error saat upload gambar:", err);
        return res.status(500).json({ msg: "Gagal upload gambar", error: err });
      }
    }

    const newDataSurat = await DataSurat.create({
      ...req.body,
      file_pendukung_url: fileUrl,
    });

    res
      .status(201)
      .json({ msg: "Data Barang berhasil ditambahkan", data: newDataSurat });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ msg: "Gagal menambahkan data", error: error.message });
  }
}

export const updateDataSurat = async (req, res) => {
    try {
        const { status, keterangan } = req.body;

        await DataSurat.update(
            { status, keterangan }, // hanya field ini yang diizinkan update
            {
                where: {
                    id: req.params.id
                }
            }
        );

        res.status(200).json({ msg: "Status dan keterangan telah diubah" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Gagal mengubah data surat", error: error.message });
    }
}

export const deleteDataSurat = async (req, res) => {
    try {
        const deleted = await DataSurat.destroy({
            where: {
                id: req.params.id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({ msg: "Data surat tidak ditemukan" });
        }

        res.status(200).json({ msg: "Data surat telah dihapus" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Gagal menghapus data surat", error: error.message });
    }
}
