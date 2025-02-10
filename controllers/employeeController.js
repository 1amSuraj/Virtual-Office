const Department = require('../models/Department');
const User = require('../models/User');

// Add employee to department (protected)
exports.addEmployee = async (req, res) => {
  const { departmentId } = req.params;
  const { employeeId } = req.body;

  try {
    // Find the department
    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    // Find the employee
    const employee = await User.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Check if the employee is already in the department
    if (department.employees.includes(employeeId)) {
      return res.status(400).json({ message: 'Employee already in the department' });
    }

    // Add employee to the department
    department.employees.push(employeeId);
    await department.save();

    res.status(200).json({ message: 'Employee added successfully', department });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all employees in a department (protected)
exports.getEmployees = async (req, res) => {
  const { departmentId } = req.params;

  try {
    // Find the department and populate employees
    const department = await Department.findById(departmentId).populate('employees');
    if (!department) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({ employees: department.employees });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove employee from department (protected)
exports.removeEmployee = async (req, res) => {
  const { departmentId, employeeId } = req.params;

  try {
    const department = await Department.findById(departmentId);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    const employeeIndex = department.employees.indexOf(employeeId);
    if (employeeIndex === -1) return res.status(400).json({ message: 'Employee not in department' });

    department.employees.splice(employeeIndex, 1);
    await department.save();

    res.status(200).json({ message: 'Employee removed from department', department });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
