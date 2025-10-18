const Task = require('../models/Task');
const TaskStatus = require('../models/TaskStatus');

class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Crear nueva tarea
    createTask(title, description, dueDate) {
        // VALIDACIONES DE NEGOCIO
        if (!title || title.trim() === '') {
            throw new Error('El título es requerido');
        }

        if (!dueDate) {
            throw new Error('La fecha de vencimiento es requerida');
        }

        // Validación de fecha corregida
        const today = new Date();
        const dueDateObj = new Date(dueDate);
        
        // Solo validar si la fecha es del pasado
        if (dueDateObj < today) {
            throw new Error('La fecha de vencimiento debe ser futura');
        }

        const task = new Task(
            null,
            title.trim(),
            description ? description.trim() : '',
            dueDateObj,
            TaskStatus.PENDING
        );

        return this.taskRepository.save(task);
    }

    // Listar tareas (con filtro opcional por estado)
    listTasks(status = null) {
        return this.taskRepository.findAll(status);
    }

    // Obtener tarea por ID
    getTaskById(id) {
        const task = this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        return task;
    }

    // Actualizar estado de tarea
    updateTaskStatus(id, status) {
        // Validar que el estado sea válido
        if (!Object.values(TaskStatus).includes(status)) {
            throw new Error('Estado inválido. Valores permitidos: PENDING, COMPLETED, CANCELLED');
        }

        const task = this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }

        return this.taskRepository.updateStatus(id, status);
    }

    // Eliminar tarea
    deleteTask(id) {
        const task = this.taskRepository.findById(id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }

        return this.taskRepository.delete(id);
    }

    // Obtener tareas vencidas
    getOverdueTasks() {
        const currentDate = new Date();
        return this.taskRepository.findOverdue(currentDate);
    }
}

module.exports = TaskService;