// routes/department.js
const express = require('express');
const departmentController = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Routes
router.post('/create', authMiddleware, departmentController.createDepartment);
router.get('/', authMiddleware, departmentController.getDepartments);
router.get('/:id', authMiddleware, departmentController.getDepartmentById);
router.put('/:id', authMiddleware, departmentController.updateDepartment);
router.delete('/:id', authMiddleware, departmentController.deleteDepartment);

module.exports = router;
