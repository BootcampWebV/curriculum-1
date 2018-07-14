import { Navegacion } from './navegacion.js'
import { ErrorMessage } from './error-message.js'

export class Tareas {

    constructor () {

        // controlador de navegación
        this.oNavegacion = new Navegacion('tareas')

        // Controlador para los mensajes de error
        this.handlerErrorMessage = new(ErrorMessage);

        this.tareas = [];

        // Elementos del DOM
        this.formNuevaTarea = document.querySelector('#form-tareas')
        this.oInputTarea = document.querySelector('#nueva-tarea')
        this.listaTareas = document.querySelector('#lista-tareas')

        this.handlerErrorMessage.currentFocus = this.oInputTarea;

        this.fetchTareas();

        this.formNuevaTarea.addEventListener('submit', this.crearTarea.bind(this))

    }    

    fetchTareas() {

        fetch("http://localhost:3000/tareas")
        .then((response) => {
            return response.json()
        })
        .then(datos => {
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
        fetch(`http://localhost:3000/tareas/${id}`, {
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
        let id = li.getAttribute('data-id')
        fetch(`http://localhost:3000/tareas/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({id: id /*, tarea: event.currentTarget.innerText, completada: !event.currentTarget.classList.contains('completada')*/})
        })
        .then(response => {
            if (response.status == 200) {
                this.listaTareas.removeChild(li);
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

    crearTarea(event) {

        event.preventDefault()
        let tarea = {
            id: this.obtenerID(),
            tarea: this.oInputTarea.value,
            completada: false
        }
        // Enviar datos al servidor json-server
        fetch('http://localhost:3000/tareas', {
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

                // Añadir nuevo elemento li a la lista de tareas
                this.listaTareas.appendChild(nuevaTarea);
            }
        })
        .catch(error => {
            console.log(error);
            this.handlerErrorMessage.showError(`ERROR guardando la tarea:\n"${error.message}."\nAsegúrese de que el servidor json-server está en ejecución.`)
        })
    }

}