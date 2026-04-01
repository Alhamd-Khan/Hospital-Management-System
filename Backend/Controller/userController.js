import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import { v2 as cloudinary } from "cloudinary";

// Login
export const login = catchAsyncErrors(async (req, res, next) => {
  console.log("Login request body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Provide All Details!", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Password Or Email", 400));
  }

  // ✅ Add this check to restrict to Admins
  if (user.role !== "Admin") {
    return next(new ErrorHandler("Only Admins can login here!", 403));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Password Or Email!", 400));
  }

  generateToken(user, "User Logged In!", 200, res);
});

// Patient Register
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic, role } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !role) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User Already Registered", 400));
  }

  const newUser = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role });
  generateToken(newUser, "User Registered!", 200, res);
});

// Add New Admin
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, nic } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} With This Email Already Exists!`));
  }

  const admin = await User.create({ firstName, lastName, email, phone, password, gender, dob, nic, role: "Admin" });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});

// Get All Doctors
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

// Get User Details
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Get Admin Details
export const getAdminDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// Logout Admin
export const logoutAdmin = (req, res, next) => {
  res.status(200).cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
  }).json({
    success: true,
    message: "User Log Out Successfully!",
  });
};

// Logout Patient
export const logoutPatient = (req, res, next) => {
  res.status(200).cookie("patientToken", "", {
    httpOnly: true,
    expires: new Date(0),
  }).json({
    success: true,
    message: "User Log Out Successfully!",
  });
};

// Add New Doctor
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor Avatar Required!", 400));
  }

  const {docAvatar} = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }

  const { firstName, lastName, email, phone, password, gender, dob, nic, doctorDepartment } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !nic || !doctorDepartment) {
    return next(new ErrorHandler("Please Provide Full Details!", 400));
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(new ErrorHandler(`${isRegistered.role} already registered with this email!`, 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
  console.error(
    "Cloudinary Error:",
    cloudinaryResponse.error || "Unknown Cloudinary Error"
  );
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered!",
    doctor,
  });
});
