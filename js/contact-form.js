export class ContactForm {
    constructor() {

        this.MAX_WORDS = 150

        this.oContactForm = document.querySelector('#form-contact')
        this.oInputNombre = document.querySelector('#name')
        this.oInputEmail = document.querySelector('#email')
        this.oSelectConocido = document.querySelector('#como-conocido')
        this.oConocidoOtros = document.querySelector('#como-conocido-otros')
        this.oContactNumber = document.querySelector('#contactNumber')
        this.oTextMessage = document.querySelector('#mensaje')
        this.oSectionError = document.querySelector('section.section-error-message')
        this.oErrorMessage = document.querySelector('.header-error-message h2')
        this.oBtnCloseErrorMessage = document.querySelector('#btn-close-message')

        this.oData = {
            nombre: '',
            email: '',
            comoConocido: '',
            comoConocidoOtros: '',
            numero: '',
            mensaje: ''
        }

        this.addEventListeners()
    }

    addEventListeners() {
        this.oSelectConocido.addEventListener('change', this.changeConocido.bind(this))
        this.oContactForm.addEventListener('submit', this.validateContactForm.bind(this))
        this.oBtnCloseErrorMessage.addEventListener('click', this.closeErrorMessage.bind(this))
    }

    changeConocido() {
        if (this.oSelectConocido.value == 'otros') {
            this.oConocidoOtros.classList.remove('oculto')
            this.oConocidoOtros.focus()
        }
        else {
            this.oConocidoOtros.classList.add('oculto')
        }
    }

    validateContactForm(event) {
        event.preventDefault();
        // Validar Nombre
        if (!this.oInputNombre.checkValidity()) {
            this.currentFocus = this.oInputNombre;
            this.showError('El campo "Nombre" no puede estar vacío')
            return;
        }
        // Validar email
        if (!this.oInputEmail.checkValidity()) {
            this.currentFocus = this.oInputEmail
            this.showError('Email incorrecto')
            return;
        }
        // Validar Número
        if (!this.oContactNumber.checkValidity()) {
            this.currentFocus = this.oContactNumber;
            this.showError('Número de contacto incorrecto.\nDebe tener 9 dígitos.')
            return;
        }
        // Validar número de palabras del mensaje
        const numPalabras = this.oTextMessage.value.trim().split(/\s+/).length;
        if (numPalabras > this.MAX_WORDS) {
            this.currentFocus = this.oTextMessage
            this.showError(`El mensaje no puede exceder de las ${this.MAX_WORDS} palabras`)
            return;
        }
        // El formulario es válido y se puede enviar
        this.guardarDatos();
//        this.oContactForm.submit();
    }

    showError(msg) {
        this.oErrorMessage.innerText = msg
        this.oSectionError.classList.add('error-visible')

        // Descomentar este código si queremos que la pantalla de error se cierre tras cierto tiempo
        /*
        setTimeout(() => {
            this.oErrorMessage.classList.remove('error-visible')
        }, 4000)
        */
    }

    closeErrorMessage() {
        this.currentFocus.focus();
        this.oSectionError.classList.remove('error-visible')   
    }

    guardarDatos() {
        this.oData = {
            nombre: this.oInputNombre.value,
            email: this.oInputEmail.value,
            comoConocido: this.oSelectConocido.value,
            comoConocidoOtros: this.oConocidoOtros.value,
            numero: this.oContactNumber.value,
            mensaje: this.oTextMessage.value
        }
        console.dir(this.oData)
    }

}