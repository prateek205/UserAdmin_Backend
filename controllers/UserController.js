import Users from "../models/userModel.js";

export const postEmployee = async (req, res) => {
  try {
    const { EmailAddress, PhoneNumber, EmployeeID } = req.body;

    if (!EmailAddress || !PhoneNumber || !EmployeeID) {
      return res
        .status(400)
        .json({ success: false, message: "All feilds are required..." });
    }

    const employeeExist = await Users.findOne({ EmployeeID });

    if (employeeExist) {
      return res
        .status(400)
        .json({ success: false, message: "User is Already exist..." });
    }

    const newEmployee = new Users(req.body);
    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "User Created Successfully...",
      newEmployee,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    let query = {};

    if (req.query.search) {
      query.$or = [
        {
          FirstName: {
            $regex: req.query.search,
            $options: "i",
          },
          LastName: {
            $regex: req.query.search,
            $options: "i",
          },
          FullName: {
            $regex: req.query.search,
            $options: "i",
          },
          EmployeeID: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ];
    }

    if (req.query.role) {
      query.Role = req.query.role;
    }

    if (req.query.department) {
      query.Department = req.query.department;
    }

    if (req.query.status) {
      query.Status = req.query.status;
    }

    let sort = { createdAt: -1 };

    switch (req.query.sort) {
      case "name-ascending":
        sort = { FullName: 1 };
        break;

      case "name-descending":
        sort = { FullName: -1 };
        break;

      case "salary-low":
        sort = { Salary: 1 };
        break;
      case "salary-high":
        sort = { Salary: -1 };
        break;

      case "joining-old":
        sort = { JoiningDate: 1 };
        break;
      case "joining-new":
        sort = { JoiningDate: -1 };
        break;

      default:
        sort = { createdAt: -1 };
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalEmployee = await Users.countDocuments(query);

    const Employee = await Users.find().sort(sort).skip(skip).limit(limit);
    res.status(200).json({
      success: true,
      count: Employee.length,
      Employee,
      page,
      limit,
      totalEmployee,
      totalPages: Math.ceil(totalEmployee / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Users.findByIdAndUpdate(id, req.body, { new: true });

    if (!employee) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(203).json({
      success: true,
      message: "User update successfully...",
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Users.findByIdAndDelete(id);

    if (!employee) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(203).json({
      success: true,
      message: "User Deleted Successfully...",
      employee,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
