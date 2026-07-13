import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    UserID: {
      type: String,
      unique: true,
    },
    FirstName: {
      trim: true,
      type: String,
    },
    LastName: {
      trim: true,
      type: String,
    },
    FullName: {
      trim: true,
      type: String,
    },
    EmailAddress: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: Date,
    },
    Age: {
      type: Number,
    },
    Gender: {
      type: String,
    },
    Department: {
      type: String,
    },
    Designation: {
      type: String,
    },
    Role: {
      type: String,
      enum: ["Admin", "Employee", "Manager"],
      default: "Employee",
    },
    EmployeeID: {
      type: String,
      unique: true,
    },
    JoiningDate: {
      type: Date,
    },
    Salary: {
      type: Number,
    },
    WorkLocation: {
      type: String,
    },
    Address: {
      type: String,
    },
    City: {
      type: String,
    },
    State: {
      type: String,
    },
    Country: {
      type: String,
    },
    ZIPCode: {
      type: String,
    },
    Status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "InActive",
    },
  },
  {
    timestamps: true,
  },
);

const Users = mongoose.model("Users", UserModel);
export default Users;
