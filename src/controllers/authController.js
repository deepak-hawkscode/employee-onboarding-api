import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import { generateToken } from "../services/tokenService.js";
import { successResponse, errorResponse } from "../utils/response.js";

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  role: Joi.string().valid("employee", "admin").default("employee"),
  department: Joi.string().allow("").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "string.empty": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
});

 
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const { name, email, password, role, department } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists) return errorResponse(res, "Employee already exists", 400);

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role,
      department,
    });

    return successResponse(
      res,
      { id: employee._id, email: employee.email },
      "Employee registered successfully"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return errorResponse(res, error.details[0].message, 400);

    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) return errorResponse(res, "Invalid email or password", 401);

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return errorResponse(res, "Invalid email or password", 401);

    const token = generateToken(employee._id);

    return successResponse(
      res,
      {
        token,
        employee: { id: employee._id, name: employee.name, role: employee.role },
      },
      "Login successful"
    );
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
