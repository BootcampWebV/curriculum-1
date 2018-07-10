import { ContactForm } from './contact-form.js'
import { Navegacion } from './navegacion.js'

export class Main {

    constructor () {

        // controlador de navegación
        this.oNavegacion = new Navegacion();

        // controlador del formulario de contacto
        this.oFormContact = new ContactForm()
    }

}