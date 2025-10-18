class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }

    // POST /tasks - Crear Tarea
    createTask = (req, res) => {
        try {
            const { title, description, dueDate } = req.body;
            
            // El controller solo maneja la request/response
            // Toda la lógica de negocio está en el Service
            const task = this.taskService.createTask(title, description, dueDate);
            
            res.status(201).json({
                message: 'Tarea creada exitosamente',
                task: task
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // GET /tasks - Listar Tareas
    listTasks = (req, res) => {
        try {
            const { status } = req.query;
            const tasks = this.taskService.listTasks(status);
            
            res.json({
                count: tasks.length,
                tasks: tasks
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // GET /tasks/:id - Obtener tarea específica
    getTaskById = (req, res) => {
        try {
            const { id } = req.params;
            const task = this.taskService.getTaskById(parseInt(id));
            
            res.json({
                task: task
            });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // PATCH /tasks/:id/status - Actualizar Estado
    updateTaskStatus = (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            const task = this.taskService.updateTaskStatus(parseInt(id), status);
            
            res.json({
                message: 'Estado de tarea actualizado exitosamente',
                task: task
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // DELETE /tasks/:id - Eliminar Tarea
    deleteTask = (req, res) => {
        try {
            const { id } = req.params;
            
            this.taskService.deleteTask(parseInt(id));
            
            res.json({ message: 'Tarea eliminada exitosamente' });
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    // GET /tasks/overdue - Tareas Vencidas 
    getOverdueTasks = (req, res) => {
        try {
            const tasks = this.taskService.getOverdueTasks();
            
            res.json({
                count: tasks.length,
                tasks: tasks
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TaskController;