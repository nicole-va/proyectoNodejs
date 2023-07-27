# Proyecto Final

Para el desarrollo del proyecto final, será necesario la aplicación de los conceptos visto en
clases y videos sobre:

- Instalación de módulos NPM
- Endpoints
- Uso de colecciones de mongo

Requerimientos:
1. Crear CRUD de usuario el cual debe tener (nombre, edad, email, pass)  :heavy_check_mark: 
2. Desarrollar la lógica de login la cual debe de contar de 2 endpoints uno de /login
permitirá realizar login recibiendo email y contraseña las cuales deben estar
almacenadas en base de datos para su consultas :heavy_check_mark:
3. /logout permitirá cerrar la sesión de un usuario  :heavy_check_mark:
4. Usar para la lógica de login el módulo npm typescript que les permite crear tokens
de usuario y enviarlo en sus header de peticiones.  :heavy_check_mark:
5. Crear un middleware capaz de validar si un usuario está logueado o no y si el token
es válido en base de datos. :heavy_check_mark:
6. Proteger los endpoints hechos en clase con este middleware de validación :heavy_check_mark:

Para un punto extra si logran encriptar sus password en base de datos con uso de algún
módulo como bcrypt y comparar en login


[Video de evidencia del postman](https://youtu.be/fCh-CHEANF0)
