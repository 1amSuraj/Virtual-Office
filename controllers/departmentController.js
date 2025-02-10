// controllers/departmentController.js
const Department = require('../models/Department');
const User = require('../models/User');

// Create a department
exports.createDepartment = async (req, res) => {
  const { name, bossId } = req.body;
  try {
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) return res.status(400).json({ message: 'Department already exists' });

    const boss = await User.findById(bossId);
    if (!boss) return res.status(400).json({ message: 'Boss not found' });

    const newDepartment = new Department({ name, boss: bossId });
    await newDepartment.save();
    res.status(201).json({ message: 'Department created successfully', department: newDepartment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('boss').populate('employees');
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a department by ID
exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id).populate('boss').populate('employees');
    if (!department) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update department details
exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name, bossId, employees } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      { name, boss: bossId, employees },
      { new: true }
    ).populate('boss').populate('employees');
    if (!updatedDepartment) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete department
exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDepartment = await Department.findByIdAndDelete(id);
    if (!deletedDepartment) return res.status(404).json({ message: 'Department not found' });
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
