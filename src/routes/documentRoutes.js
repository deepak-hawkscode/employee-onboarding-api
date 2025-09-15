import { Router } from "express";
import multer from "multer";
import path from "path";
import { uploadDocuments, downloadDocument } from "../controllers/documentController.js";
import { protect } from "../middleware/authMiddleware.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Max size: 5MB
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

const router = Router();

router.post("/upload", protect, upload.array("documents", 5), uploadDocuments);

router.get("/download/:name", protect, downloadDocument);

export default router;
