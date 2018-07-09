export class FormContact {
    constructor() {
        // elementos del DOM
                
        /*
                    <div class="btn-wrapper">
                        <button type="reset" id="borrar">Reset</button>
                        <button type="submit" id="enviar">Enviar</button>
                    </div>        
        */

        this.MAX_PALABRAS = 150

        this.oFormContacto = document.querySelector('#form-contact')
        this.oInputName = document.querySelector('#name')
        this.oInputCorreo = document.querySelector('#email')
        this.oSelectConocido = document.querySelector('#como-conocido')
        this.oConocidoOtros = document.querySelector('#como-conocido-otros')
        this.oContactNumber = document.querySelector('#contactNumber')
        this.oTextMessage = document.querySelector('#mensaje')

        this.oData = {
            nnombre: '',
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
        //this.oTextMessage.addEventListener('change', this.probarInput)
        this.oTextMessage.addEventListener('input', this.contarPalabras)
        this.oFormContacto.addEventListener('submit', this.validateContactForm.bind(this))
    }

    contarPalabras(event) {
        event.preventDefault();
        let numPalabras = event.target.value.trim().split(/\s+/).length;
        if (numPalabras > 150) {
            event.preventDefault();
            alert("Nº máximo de palabras (150) excedido");
        }
    }


    /*
    probarInput(oE) {
        if(oE.type == "change") {
            console.log('change')
            console.dir(oE.target.value)
        } else if (oE.type == "input") {
            console.log('input')
            console.dir(oE.target.value)
        }
    }*/

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
        console.log(event.target)
        // Validar Nombre
        if (!this.oInputName.checkValidity()) {
            this.oInputName.focus()
            alert("El campo Nombre no puede estar vacío");
            return;
        }
        // Validar email
        if (!this.oInputCorreo.checkValidity()) {
            this.oInputCorreo.focus()
            alert("Email incorrecto")
            return;
        }
        // Validar Número
        if (!this.oContactNumber.checkValidity()) {
            this.oContactNumber.focus()
            alert("Número de contacto incorrecto. Debe tener 9 dígitos");
            return;
        }
        // Validar número de palabras del mensaje
        const numPalabras = this.oTextMessage.value.trim().split(/\s+/).length;
        if (numPalabras > this.MAX_PALABRAS) {
            this.oTextMessage.focus()
            alert(`El mensaje no puede exceder de las ${this.MAX_PALABRAS} palabras`);
            return;
        }
        
        this.oFormContacto.submit();

    }

    guardarDatos() {
        this.oData = {
            name:  this.oInputName.value,
            email: this.oInputEmail.value ,
            phone: this.oInputPhone.value,
            message: this.oTextMessage.value,
            condiciones: this.oCheckCondiciones.checked,
            opciones: this.processRadio(this.oRadioOpciones),
            seleccion: this.oSelectSeleccion.options[this.oSelectSeleccion.selectedIndex].value
        }

    console.dir(this.oData)
    }

    processRadio(aNodos) {
        let value
        aNodos.forEach(
            (item) => {if(item.checked) {value = item.value}}
        )
        return value
    }

}