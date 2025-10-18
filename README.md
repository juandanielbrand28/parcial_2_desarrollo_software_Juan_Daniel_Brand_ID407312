# Sistema de Gestión de Tareas - Parcial 2
**Nombre:** Juan Daniel Brand Silva
**Código:** 407312
**Materia:** Desarrollo de Software II


## Decisiones de Diseño

Se implementó una arquitectura en capas tradicional que separa claramente las responsabilidades:
- **Controllers**: Manejan exclusivamente requests/responses HTTP, sin lógica de negocio
- **Services**: Contienen toda la lógica de negocio y validaciones
- **Repositories**: Encapsulan el acceso a datos usando el patrón Repository
- **Models**: Definen la estructura de datos y enums

Se eligió almacenamiento en memoria (Map) para simplicidad, pero el patrón Repository permite cambiar fácilmente a base de datos. Las validaciones de negocio como fechas futuras y estados válidos están centralizadas 
en el Service.

Link de acceso al video explicativo: https://drive.google.com/file/d/1O0amUXZ5me9wWeqFg4R1L9L-CXGIzI84/view?usp=sharing
