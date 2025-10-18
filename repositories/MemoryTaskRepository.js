const TaskRepository = require('./TaskRepository');
const Task = require('../models/Task');
const TaskStatus = require('../models/TaskStatus');

class MemoryTaskRepository extends TaskRepository {
    constructor() {
        super();
        this.tasks = new Map();
        this.nextId = 1;
    }

    save(task) {
        if (!task.id) {
            task.id = this.nextId++;
        }
        this.tasks.set(task.id, task);
        return task;
    }

    findAll(status = null) {
        const tasksArray = Array.from(this.tasks.values());
        if (status) {
            return tasksArray.filter(task => task.status === status);
        }
        return tasksArray;
    }

    findById(id) {
        return this.tasks.get(Number(id)) || null;
    }

    delete(id) {
        return this.tasks.delete(Number(id));
    }

    findOverdue(currentDate) {
        return Array.from(this.tasks.values()).filter(task => 
            new Date(task.dueDate) < currentDate && task.status === TaskStatus.PENDING
        );
    }

    updateStatus(id, status) {
        const task = this.findById(id);
        if (task) {
            task.status = status;
            this.save(task);
            return task;
        }
        return null;
    }
}

module.exports = MemoryTaskRepository;