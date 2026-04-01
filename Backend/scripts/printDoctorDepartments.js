// Temporary script to print all doctor departments for debugging
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";

async function printDoctorDepartments() {
  await mongoose.connect("mongodb://localhost:27017/hospital-management-system");
  const doctors = await User.find({ role: "Doctor" });
  doctors.forEach(doc => {
    console.log(`${doc.firstName} ${doc.lastName} - ${doc.doctorDepartment}`);
  });
  await mongoose.disconnect();
}

printDoctorDepartments();
