import { Navegacion } from './navegacion.js'
import { ErrorMessage } from './error-message.js'

const URL_API = 'http://localhost:3000/tareas'

/* Para el formulario de tareas se deja la validación a cargo del navegador (no tiene atributo "novalidate"). 
   Del mismo modo que el formulario de contacto, se capturan los eventos "input" y "blur" del campo 
   para poner o quitar el borde rojo. Si el campo no es válido, se establece el mensaje de error a mostrar adecuado 
   para cuando se pulse el botón submit, mediante la función "setCustomValidity"
*/

export class Tareas {

    constructor () {

        // controlador de navegación
        this.oNavegacion = new Navegacion('tareas')

        // Controlador para los mensajes de error
        this.handlerErrorMessage = new(ErrorMessage);

        // Lista de tareas
        this.tareas = [];

        // Elementos del DOM
        this.formNuevaTarea = document.querySelector('#form-tareas')
        this.oInputTarea = document.querySelector('#nueva-tarea')
        this.listaTareas = document.querySelector('#lista-tareas')

        this.handlerErrorMessage.currentFocus = this.oInputTarea;

        // Cargar tareas del REST API json-server
        this.fetchTareas();

        // Evento blur para el campo de texto
        // this.oInputTarea.addEventListener('blur', this.validarTarea)
        
        // Evento Input para validar el campo tarea
        this.oInputTarea.addEventListener('input', this.validarTarea.bind(this))
        this.oInputTarea.addEventListener('focus', this.validarTarea.bind(this))
        this.setErrorMessage()

        // Evento submit del formulario, validar y crear nueva tarea
        this.formNuevaTarea.addEventListener('submit', this.crearTarea.bind(this))
    }    

    fetchTareas() {

        fetch(URL_API)
        .then((response) => {
            return response.json()
        })
        .then(datos => {
            // Carga correcta, añadir la lista al DOM
            this.tareas = datos;
            this.cargarTareas();
        })
        .catch(error => {
            this.handlerErrorMessage.showError(`ERROR cargando la lista de tareas:\n"${error.message}."\nAsegúrese de que el servidor json-server está en ejecución.`)
        })
    }

    cargarTareas() {

        // Crear HTML para rellenar la lista
        let htmlTareas = ''
        this.tareas.forEach(tarea => {
            let completada = tarea.completada ? 'completada' : '';
            htmlTareas += `<li data-id="${tarea.id}">\n
                            <span class="texto-tarea ${completada}">${tarea.tarea}</span>\n
                            <span class="btn-eliminar-tarea" title="Eliminar Tarea">\n
                                <i class="fas fa-trash-alt"></i>\n
                            </span>\n
                          </li>\n`
        })
        this.listaTareas.innerHTML = htmlTareas;

        // Añadir eventos de toggle completada
        this.textoTareas = document.querySelectorAll('span.texto-tarea')
        this.textoTareas.forEach(tarea => tarea.addEventListener('click', this.toggleTareaCompletada.bind(this)))

        // Añadir eventos de eliminar
        this.btnEliminarTareas = document.querySelectorAll('span.btn-eliminar-tarea')
        this.btnEliminarTareas.forEach(btnEliminarTarea => btnEliminarTarea.addEventListener('click', this.eliminarTarea.bind(this)))
    }

    toggleTareaCompletada(event) {

        // Obtener id de la tarea a marcar como completada
        let li = event.target.parentNode
        let id = li.getAttribute('data-id')
        fetch(`${URL_API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({tarea: event.currentTarget.innerText, completada: !event.currentTarget.classList.contains('completada')})
        })
        .then(response => {
            if (response.status == 200) {
                event.target.classList.toggle('completada');
            }
        })
        .catch(error => {
            this.handlerErrorMessage.showError(error.message)
            this.handlerErrorMessage.showError(`ERROR cambiando el estado de la tarea:\n"${error.message}."\nAsegúrese de que el servidor json-server está en ejecución.`)
        })
    }

    eliminarTarea(event) {

        event.stopPropagation();
        // Obtener id de la tarea a marcar como completada
        let li = event.currentTarget.parentNode
        let id_tarea = parseInt(li.getAttribute('data-id'))
        fetch(`${URL_API}/${id_tarea}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({id: id_tarea})
        })
        .then(response => {
            if (response.status == 200) {
                // Eliminar li del DOM
                this.listaTareas.removeChild(li);

                // Eliminar tarea de la lista
                this.tareas = this.tareas.filter(tarea => {
                    return tarea.id != id_tarea
                })
            }
        })
        .catch(error => {
            this.handlerErrorMessage.showError(`ERROR eliminando la tarea:\n"${error.message}."\nAsegúrese de que el servidor json-server está en ejecución.`)
        })
    }

    obtenerID() {

        let max = 0;
        this.tareas.forEach(tarea => {
            if (tarea.id > max) {
                max = tarea.id;
            }
        })
        return max + 1
    }

    validarTarea() {
        let msg = ''
        this.oInputTarea.setCustomValidity(msg)
        if(!this.oInputTarea.checkValidity()) {
            msg = 'Debe introducir la Tarea'
            this.oInputTarea.classList.add('invalido')
        }
        else {
            this.oInputTarea.classList.remove('invalido')
        }
        this.oInputTarea.setCustomValidity(msg)
    }

    setErrorMessage() {
        let msg = ''
        this.oInputTarea.setCustomValidity(msg)
        if(!this.oInputTarea.checkValidity()) {
            msg = 'Debe introducir la Tarea'
        }
        this.oInputTarea.setCustomValidity(msg)
    }

    crearTarea(event) {

        event.preventDefault()

        // Crear nuevo objeto tarea
        let tarea = {
            id: this.obtenerID(),
            tarea: this.oInputTarea.value,
            completada: false
        }

        // Enviar datos al servidor json-server
        fetch(URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(tarea)
        })
        .then(response => {
            if (response.status == 201) {
                // Añadir tarea al DOM
                let nuevaTarea = document.createElement('li');
                nuevaTarea.setAttribute('data-id', tarea.id);
                nuevaTarea.innerHTML = `<span class="texto-tarea ${tarea.completada}">${tarea.tarea}</span>\n
                                        <span class="btn-eliminar-tarea" title="Eliminar Tarea">\n
                                            <i class="fas fa-trash-alt"></i>\n
                                        </span>\n`
                // Añadir eventos de toggle completada y eliminar al nuevo nodo de tarea
                nuevaTarea.querySelector('span.texto-tarea').addEventListener('click', this.toggleTareaCompletada.bind(this))
                nuevaTarea.querySelector('span.btn-eliminar-tarea').addEventListener('click', this.eliminarTarea.bind(this))

                // Añadir tarea a la lista
                this.tareas.push(tarea);

                // Añadir nuevo elemento li al DOM de la lista de tareas
                this.listaTareas.appendChild(nuevaTarea);

                // Limpiar campo del formulario
                this.oInputTarea.value = ''
                this.setErrorMessage()
            }
        })
        .catch(error => {
            console.log(error);
            this.handlerErrorMessage.showError(`ERROR guardando la tarea:\n"${error.message}."\nAsegúrese de que el servidor json-server está en ejecución.`)
        })
    }

}