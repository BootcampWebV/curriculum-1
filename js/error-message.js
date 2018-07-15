export class ErrorMessage {
    
    constructor() {

        // Elementos del DOM
        this.oSectionError = document.querySelector('section.section-error-message')
        this.oCuadroError = document.querySelector('.header-error-message')
        this.oErrorMessage = document.querySelector('.header-error-message h2')
        this.oBtnCloseErrorMessage = document.querySelector('#btn-close-message')

        this.oBtnCloseErrorMessage.addEventListener('click', this.closeErrorMessage.bind(this))
    }

    showError(msg, type='error') {
        if (type === 'error') {
            this.oCuadroError.classList.remove('ok')
            this.oCuadroError.classList.add('error')
        } 
        else {
            this.oCuadroError.classList.add('ok')
            this.oCuadroError.classList.remove('error')
        }
        this.oErrorMessage.innerText = msg
        this.oSectionError.classList.add('error-visible')

        // Descomentar este código si queremos que la pantalla se cierre tras cierto tiempo
        /*
        setTimeout(() => {
            this.oSectionError.classList.remove('error-visible')
        }, 5000)
        */
    }

    closeErrorMessage() {
        this.currentFocus.focus();
        this.oSectionError.classList.remove('error-visible')   
    }

}