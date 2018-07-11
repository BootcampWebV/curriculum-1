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
        this.oErrorMessage = document.querySelector('section.section-error-message')
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
            //this.oInputNombre.focus()
            //alert("El campo Nombre no puede estar vacío");
            this.currentFocus = this.oInputNombre;
            this.mostrarError('El campo "Nombre" no puede estar vacío')
            return;
        }
        // Validar email
        if (!this.oInputEmail.checkValidity()) {
            //this.oInputEmail.focus()
            //alert("Email incorrecto")
            this.currentFocus = this.oInputEmail
            this.mostrarError('Email incorrecto')
            return;
        }
        // Validar Número
        if (!this.oContactNumber.checkValidity()) {
            //this.oContactNumber.focus()
            //alert("Número de contacto incorrecto. Debe tener 9 dígitos");
            this.currentFocus = this.oContactNumber;
            this.mostrarError('Número de contacto incorrecto.\nDebe tener 9 dígitos.')
            return;
        }
        // Validar número de palabras del mensaje
        const numPalabras = this.oTextMessage.value.trim().split(/\s+/).length;
        if (numPalabras > this.MAX_WORDS) {
            //this.oTextMessage.focus()
            //alert(`El mensaje no puede exceder de las ${this.MAX_WORDS} palabras`);
            this.currentFocus = this.oTextMessage
            this.mostrarError(`El mensaje no puede exceder de las ${this.MAX_WORDS} palabras`)
            return;
        }
        // El formulario es válido y se puede enviar
        this.oContactForm.submit();
    }

    mostrarError(msg, objFocus) {
        let oMessage = document.querySelector('.header-error-message .error-message')
        oMessage.innerText = msg
        this.oErrorMessage.classList.remove('error-oculto')
        this.oErrorMessage.children[0].classList.remove('texto-error-oculto')
        /*
        setTimeout(() => {
            this.oErrorMessage.classList.add('error-oculto')
        }, 4000)
        */
    }

    closeErrorMessage() {
        this.currentFocus.focus();
        this.oErrorMessage.classList.add('error-oculto')   
        this.oErrorMessage.children[0].classList.add('texto-error-oculto')
    }

    guardarDatos() {
        this.oData = {
            nombre: this.oInputNombre.value,
            email: this.oInputEmail.value,
            comoConocido: this.oSelectConocido.value,
            comoConocidoOtros: this.oSelectConocidoOtros.value,
            numero: this.oContactNumber.value,
            message: this.oTextMessage.value
        }
        console.dir(this.oData)
    }

}