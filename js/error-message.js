export class ErrorMessage {
    
    constructor() {

        // Elementos del DOM
        this.oSectionError = document.querySelector('section.section-error-message')
        this.oErrorMessage = document.querySelector('.header-error-message h2')
        this.oBtnCloseErrorMessage = document.querySelector('#btn-close-message')

        this.oBtnCloseErrorMessage.addEventListener('click', this.closeErrorMessage.bind(this))
    }

    showError(msg) {
        this.oErrorMessage.innerText = msg
        this.oSectionError.classList.add('error-visible')

        // Descomentar este código si queremos que la pantalla de error se cierre tras cierto tiempo
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