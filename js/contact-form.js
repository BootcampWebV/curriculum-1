import { ErrorMessage } from './error-message.js'

const MAX_WORDS = 150

/* El formulario de contacto tiene el atributo "novalidate", de modo que la validación se hace en el evento "submit" del mismo, 
   donde se comprueba la validez de cada campo mediante la función "checkValidity" y se muestra un mensaje de error emergente 
   para el primer campo que no cumpla la validación. Se capturan los eventos "input" y "blur" de cada campo para poner o quitar 
   un borde rojo según sea válido o no
*/

export class ContactForm {

    constructor() {

        this.URL_API = 'http://localhost:3000/messages'

        // Controlador para los mensajes de error
        this.handlerErrorMessage = new(ErrorMessage)

        this.oContactForm = document.querySelector('#form-contact')
        this.oInputNombre = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oSelectConocido = document.querySelector('#como-conocido')
        this.oConocidoOtros = document.querySelector('#como-conocido-otros')
        this.oContactNumber = document.querySelector('#contactNumber')
        this.oTextMessage = document.querySelector('#mensaje')

        this.oData = {
            nombre: '',
            email: '',
            comoConocido: '',
            comoConocidoOtros: '',
            numero: '',
            mensaje: ''
        }

        this.mensajes = [];

        // Añadir eventos
        this.addEventListeners()

        // Cargar mensajes de la API json-server.
        // Si el servidor no está corriendo o hay algún error, se muestra en la consola, pero no se muestra el mensaje emergente
        this.cargarMensajes()
    }

    addEventListeners() {
        
        this.oSelectConocido.addEventListener('change', this.changeConocido.bind(this))
        this.oInputNombre.addEventListener('input', this.comprobarCampo)
        this.oInputNombre.addEventListener('blur', this.comprobarCampo)
        this.oInputEmail.addEventListener('input', this.comprobarCampo)
        this.oInputNombre.addEventListener('blur', this.comprobarCampo)
        this.oContactNumber.addEventListener('input', this.comprobarCampo)
        this.oTextMessage.checkValidity = this.comprobarPalabras
        this.oTextMessage.addEventListener('input', this.comprobarCampo)
        this.oTextMessage.addEventListener('blur', this.comprobarCampo)
        this.oContactForm.addEventListener('submit', this.validateContactForm.bind(this))
    }

    cargarMensajes() {

        fetch(this.URL_API)
        .then(response => {
            return response.json()
        })
        .then(datos => {
            this.mensajes = datos;
        })
        .catch(error => {
            console.log(error);
        })
    }

    // Comprobar validez de un campo
    comprobarCampo(event) {

        if (this.checkValidity()) {
            this.classList.remove('invalido')
        }
        else {
            this.classList.add('invalido')
        }
    }

    // Comprobar que el número de palabras no exceda del máximo
    comprobarPalabras() {

        const numPalabras = this.value.trim().split(/\s+/).length;
        return numPalabras <= MAX_WORDS
    }

    // Mostar/ocultar campo de texto en función del valor del select 'Como me has conocido'
    changeConocido() {

        if (this.oSelectConocido.value == 'otros') {
            this.oConocidoOtros.classList.remove('oculto')
            this.oConocidoOtros.focus()
        }
        else {
            this.oConocidoOtros.classList.add('oculto')
        }
    }

    // validar formulario
    validateContactForm(event) {

        event.preventDefault();

        // Validar Nombre
        if (!this.oInputNombre.checkValidity()) {
            this.handlerErrorMessage.currentFocus = this.oInputNombre;
            this.handlerErrorMessage.showError('El campo "Nombre" no puede estar vacío')
            return;
        }
        // Validar email
        if (!this.oInputEmail.checkValidity()) {
            this.handlerErrorMessage.currentFocus = this.oInputEmail
            this.handlerErrorMessage.showError('Email incorrecto')
            return;
        }
        // Validar Número
        if (!this.oContactNumber.checkValidity()) {
            this.handlerErrorMessage.currentFocus = this.oContactNumber;
            this.handlerErrorMessage.showError('Número de contacto incorrecto.\nDebe tener 9 dígitos.')
            return;
        }
        // Validar número de palabras del mensaje
        if (!this.oTextMessage.checkValidity()) {
            this.handlerErrorMessage.currentFocus = this.oTextMessage
            this.handlerErrorMessage.showError(`El mensaje no puede exceder de las ${MAX_WORDS} palabras`)
            return;
        }
        
        // Guardar los datos con la API json-server
        this.guardarDatos();

        // El formulario es válido y se puede enviar, pero la linea está comentada dado que no hay servidor al que enviar los datos
        // this.oContactForm.submit();
    }

    obtenerID() {

        let max = 0;
        this.mensajes.forEach(mensaje => {
            if (mensaje.id > max) {
                max = mensaje.id;
            }
        })
        return max + 1
    }

    guardarDatos() {
        
        this.oData = {
            id: this.obtenerID(),
            nombre: this.oInputNombre.value,
            email: this.oInputEmail.value,
            comoConocido: this.oSelectConocido.value,
            comoConocidoOtros: this.oConocidoOtros.value,
            numero: this.oContactNumber.value,
            mensaje: this.oTextMessage.value
        }
        console.dir(this.oData)

        this.mensajes.push(this.oData);

        // Enviar datos al servidor json-server
        fetch(this.URL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(this.oData)
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            // Se muestra el error en la consola, pero no se muestra el mensaje emergente
            console.log(error);
        })
    }

}