import User from '../models/User.js';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../exports/users.xlsx');

const ensureExportDir = () => {
    const exportDir = path.join(__dirname, '../exports');
    if (!fs.existsSync(exportDir)) {
        fs.mkdirSync(exportDir);
        console.log(" 'exports' directory created");
    }
};

const loadWorkbook = async () => {
    const workbook = new ExcelJS.Workbook();

    if (fs.existsSync(filePath)) {
        await workbook.xlsx.readFile(filePath);
        console.log(" Loaded existing Excel file");
    } else {
        console.log("Creating new Excel file");
        workbook.addWorksheet('Users Data');
    }

    let worksheet = workbook.getWorksheet('Users Data') || workbook.addWorksheet('Users Data');

    if (worksheet.rowCount === 0) {
        worksheet.columns = [
            { header: 'First Name', key: 'FirstName', width: 20 },
            { header: 'Last Name', key: 'LastName', width: 20 },
            { header: 'Email', key: 'Email', width: 30 },
            { header: 'Mobile Number', key: 'MobileNumber', width: 15 },
            { header: 'City', key: 'City', width: 15 },
            { header: 'Message', key: 'Message', width: 40 },
            { header: 'PinCode', key: 'PinCode', width: 10 },
            { header: 'Address', key: 'Address', width: 40 },
            { header: "Status", key: "status", width: 15 },
            { header: 'Created At', key: 'createdAt', width: 25 },
        ];
    }
    return { workbook, worksheet };
};

export const Appointment = async (req, res) => {
    const { FirstName, LastName, email, MobileNumber, City,PinCode, Message, Address } = req.body;

    try {
        console.log("Received Data: ", req.body);

        const errors = [];

        if (!FirstName || FirstName.length < 2 || !/^[A-Za-z]+$/.test(FirstName)) {
            errors.push("FirstName is Required, Should be at least 2 Characters and Contains Only Letters.");
        }

        if (!LastName || LastName.length < 3 || !/^[A-Za-z]+$/.test(LastName)) {
            errors.push("LastName is Required, Should be at least 3 Characters and Contains Only Letters.");
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("Invalid Email Format.");
        }

        if (!MobileNumber || !/^\d{10}$/.test(MobileNumber)) {
            errors.push("MobileNumber Must be a 10-Digit Number.");
        }

        if (!City || !/^[A-Za-z\s]+$/.test(City)) {
            errors.push("City is Required");
        }

        if (!PinCode || !/^\d{6}$/.test(PinCode)) {
            errors.push("PinCode is Required and Must be a 6-Digit Number.");
        }

        if (!Message || Message.length < 10) {
            errors.push("Message is Required and Should be at Least 10 Characters.");
        }

        if (!Address || Address.length < 10) {
            errors.push("Address is Required and Should be at Least 10 Characters.");
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Validation Errors Occurred.",
                errors,
            });
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with This Email...!",
            });
        }

        const newUser = new User({ FirstName, LastName, email, MobileNumber, City, PinCode, Message, Address });
        await newUser.save();
        console.log("User saved in MongoDB:", newUser);

        ensureExportDir();

        const { workbook, worksheet } = await loadWorkbook();

        worksheet.addRow({
            FirstName,
            LastName,
            email,
            MobileNumber,
            City, 
            PinCode,
            Message,
            Address,
            createdAt: new Date().toISOString(),
        });

        await workbook.xlsx.writeFile(filePath);
        console.log("Excel updated with new user");

        res.status(200).json({
            success: true,
            message: "Your Request Submitted Successfully..!",
            newUser,
        });

    } catch (error) {
        console.error("Error in Appointment...!", error);
        res.status(500).json({
            success: false,
            message: "Error occurred While Processing Your Request...!",
        });
    }
};

export const exportAllUsersToExcel = async (req, res) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No user data found.",
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users Data');

        worksheet.columns = [
            { header: 'First Name', key: 'FirstName', width: 20 },
            { header: 'Last Name', key: 'LastName', width: 20 },
            { header: 'Email', key: 'Email', width: 30 },
            { header: 'Mobile Number', key: 'MobileNumber', width: 15 },
            { header: 'City', key: 'City', width: 20 },
            { header: 'PinCode', key: 'PinCode', width: 20 },
            { header: 'Message', key: 'Message', width: 40 },
            { header: 'Address', key: 'Address', width: 40 },
            { header: "Status", key: "status", width: 15 },
            { header: 'Created At', key: 'createdAt', width: 25 },
        ];

        users.forEach(user => {
            worksheet.addRow({
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.email,
                MobileNumber: user.MobileNumber,
                City: user.City,
                PinCode: user.PinCode,
                Message: user.Message,
                Address: user.Address,
                status : user.status,
                createdAt: user.createdAt ? user.createdAt.toISOString() : new Date().toISOString(), 
            });
        });

        ensureExportDir();

        await workbook.xlsx.writeFile(filePath);
        console.log("User data exported to Excel");

        res.download(filePath, 'users.xlsx', (err) => {
            if (err) {
                console.error(" Error downloading Excel file:", err);
                res.status(500).json({
                    success: false,
                    message: "Error occurred while downloading the Excel file.",
                });
            }
        });

    } catch (error) {
        console.error(" Error in exportAllUsersToExcel:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while exporting users.",
        });
    }
};

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await User.find({});

        if (appointments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Appointment Records Found...!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointments Fetched Successfully...!",
            data: appointments,
        });
    } catch (error) {
        console.error("Error in getAllAppointments:", error);
        res.status(500).json({
            success: false,
            message: "An Error Occurred While Fetching Appointments.",
        });
    }
};

export const addRemark = async (req, res) => {
    try {
      const { remark } = req.body;
      console.log("Received Remark:", remark); // Debugging
      console.log("Received ID:", req.params.id); // Debugging
  
      const appointment = await User.findById(req.params.id);
  
      if (!appointment) {
        return res.status(404).json({ success: false, message: "Appointment not found" });
      }
  
      appointment.remark = remark;
      await appointment.save();
  
      res.json({ success: true, message: "Remark added successfully!", appointment });
    } catch (error) {
      console.error("Error in addRemark:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id, status } = req.params;

        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Missing parameters" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        ensureExportDir();
        const { workbook, worksheet } = await loadWorkbook();

        let rowFound = false;
        worksheet.eachRow((row, rowNumber) => {
            if (row.getCell(1).value === updatedUser._id.toString()) {
                row.getCell(6).value = status; 
                row.getCell(7).value = new Date().toLocaleString(); 
                rowFound = true;
            }
        });

        if (!rowFound) {
            worksheet.addRow({
                _id: updatedUser._id.toString(),
                FirstName: updatedUser.FirstName,
                LastName: updatedUser.LastName,
                email: updatedUser.email,
                MobileNumber: updatedUser.MobileNumber,
                status: status,
                updatedAt: new Date().toLocaleString(),
            });
        }

        await workbook.xlsx.writeFile(filePath);
        console.log("Excel file updated successfully!");

        res.json({ success: true, message: "Status updated and Excel updated", data: updatedUser });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
