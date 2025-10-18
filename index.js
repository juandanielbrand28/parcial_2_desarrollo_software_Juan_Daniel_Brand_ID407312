const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const taskRoutes = require('./routes/taskRoutes');

// Usar rutas
app.use('/tasks', taskRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
    res.json({ 
        message: '✅ Sistema de Gestión de Tareas - API Activa',
        version: '1.0.0',
        endpoints: {
            'POST /tasks': 'Crear nueva tarea',
            'GET /tasks': 'Listar todas las tareas',
            'GET /tasks?status=PENDING': 'Filtrar tareas por estado',
            'PATCH /tasks/:id/status': 'Actualizar estado de tarea',
            'DELETE /tasks/:id': 'Eliminar tarea',
            'GET /tasks/overdue': 'Obtener tareas vencidas'
        },
        estados_permitidos: ['PENDING', 'COMPLETED', 'CANCELLED']
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Ruta no encontrada',
        path: req.path,
        method: req.method
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
    console.log(`📋 Sistema de Gestión de Tareas listo para usar`);
    console.log(`📍 Endpoints disponibles en http://localhost:${port}/`);
});