import Employee from "../models/Employee.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({},{__v:0}).select("-password");
    return successResponse(res, employees, "Employees fetched");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id,{__v:0}).select("-password");
    if (!employee) return errorResponse(res, "Employee not found", 404);
    return successResponse(res, employee, "Employee fetched");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!employee) return errorResponse(res, "Employee not found", 404);

    return successResponse(res, employee, "Employee updated");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return errorResponse(res, "Employee not found", 404);

    return successResponse(res, {}, "Employee deleted");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
export const getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user._id,{createdAt:0,updatedAt:0,__v:0}).select("-password");
    if (!employee) return errorResponse(res, "Employee not found", 404);

    return successResponse(res, employee, "Profile fetched successfully");
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};