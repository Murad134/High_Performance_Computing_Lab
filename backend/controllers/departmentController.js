const departmentModel = require('../models/departmentModel');

exports.createDepartment = async (req, res) => {
  try {
    const { _id, ...data } = req.body;

    // ✅ Call model and pass data (model will generate new _id)
    const result = await departmentModel.createDepartment(data);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.getAllDepartments();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await departmentModel.getDepartmentById(req.params.id);
        res.json(department);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateDepartment = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // ✅ Remove _id to prevent MongoDB immutable field error
        delete updateData._id;

        const result = await departmentModel.updateDepartment(req.params.id, updateData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteDepartment = async (req, res) => {
    try {
        const result = await departmentModel.deleteDepartment(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};