const TaskStatus = require('./TaskStatus');

class Task {
    constructor(id, title, description, dueDate, status = TaskStatus.PENDING) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

module.exports = Task;