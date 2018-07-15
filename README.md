# Currículum. Práctica de Fundamentos de Frontend.
Mi Currículum Vitae (C.V.)

## Notas:

### Lista de Tareas

Está implementada una pequeña lista de tareas para practicar el uso de AJAX y fetch.
Para utilizarlo, hay que ejecutar el servidor fake REST API "*json-server*", dentro de la carpeta "api".
Se instala situándose en la carpeta "api" y ejecutando "npm install".
Para arrancar el servidor, ejecutar "node server.js", también desde la carpeta "api".
Si no se está ejecutando este servidor, el apartado de la lista de tareas mostrará un mensaje de error.

### Validación de formularios

El formulario de contacto tiene el atributo "novalidate", de modo que la validación se hace en el evento "submit" del mismo, donde se comprueba la validez de cada campo mediante la función "checkValidity" y se muestra un mensaje de error emergente para el primer campo que no cumpla la validación.
Se capturan los eventos "input" y "focus" de cada campo para poner o quitar un borde rojo según sea válido o no

Para el formulario de tareas se deja la validación a cargo del navegador (no tiene atributo "novalidate").
Del mismo modo que el formulario de contacto, se capturan los eventos "input" y "focus" del campo para poner o quitar el borde rojo. Si el campo no es válido, se establece el mensaje de error a mostrar adecuado para cuando se pulse el botón submit, mediante la función "setCustomValidity"


