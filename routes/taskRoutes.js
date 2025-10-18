const express = require('express');
const router = express.Router();

// Importar todas las dependencias
const MemoryTaskRepository = require('../repositories/MemoryTaskRepository');
const TaskService = require('../services/TaskService');
const TaskController = require('../controllers/TaskController');

// Inicializar la arquitectura en capas
const taskRepository = new MemoryTaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

// Definir los endpoints
router.post('/', taskController.createTask);
router.get('/', taskController.listTasks);
router.get('/:id', taskController.getTaskById); // ← NUEVO ENDPOINT AGREGADO
router.patch('/:id/status', taskController.updateTaskStatus);
router.delete('/:id', taskController.deleteTask);
router.get('/overdue', taskController.getOverdueTasks);

module.exports = router;