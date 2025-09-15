import fs from "fs";
import path from "path";

export const saveFileInfo = (file) => {
  return {
    filename: file.filename,
    path: file.path,
    size: file.size,
    mimetype: file.mimetype,
  };
};

export const getFileByName = (filename) => {
  const filePath = path.join(process.cwd(), "uploads", filename);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
};
