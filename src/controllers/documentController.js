import path from "path";
import Document from "../models/Document.js";
import { saveFileInfo } from "../services/fileService.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const uploadDocuments = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const fileInfos = req.files.map((file) => saveFileInfo(file));

    const documents = await Document.insertMany(
      fileInfos.map((info) => ({
        employee: req.user._id,
        ...info,
      }))
    );

    return successResponse(res, documents, "Documents uploaded successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ employee: req.user._id });
    return successResponse(res, docs, "Documents fetched");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return errorResponse(res, "Document not found", 404);

    return successResponse(res, {}, "Document deleted");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const downloadDocument = async (req, res) => {
  try {
    const { name } = req.params;

    const doc = await Document.findOne({ filename: name, employee: req.user._id });
    if (!doc) return errorResponse(res, "Document not found", 404);

    const filePath = path.resolve(doc.path);
    return res.download(filePath, doc.filename);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
