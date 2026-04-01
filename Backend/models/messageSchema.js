import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
      return /^\d{11}$/.test(v);  // exactly 11 digits numeric string
    },
    message: "Phone Number Must Contain Exactly 11 Digits!"
  }
},

   message: {
  type: String,
  required: true,
  validate: {
    validator: function(v) {
  return v.length >= 10;
},
message: "Message must contain at least 10 characters!"

  }
},

});

export const Message = mongoose.model("Message", messageSchema);
