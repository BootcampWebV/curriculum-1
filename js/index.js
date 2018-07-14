import { Navegacion } from './navegacion.js'
import { ContactForm } from './contact-form.js'

export class Index {

    constructor() {

        // controlador de navegación
        this.oNavegacion = new Navegacion('index');

        // controlador del formulario de contacto
        this.oFormContact = new ContactForm()

        // Elementos del DOM
        this.oFotoQuienSoy = document.querySelector('.foto-quien-soy');
        this.wrapperAmpliarReducirFoto = document.querySelector(".wrapper-foto")
        this.icomAmpliarReducirFoto = document.querySelector(".wrapper-foto .fa-stack-1x")

        this.defineEventListeners();
    }

    defineEventListeners() {

        // Ampliar/reducir foto
        this.wrapperAmpliarReducirFoto.addEventListener('click', this.ampliarFoto.bind(this))
    }

    ampliarFoto(event) {
        
        if (this.oFotoQuienSoy.classList.contains('ampliada')) {
            this.oFotoQuienSoy.classList.remove('ampliada')            
            this.oFotoQuienSoy.setAttribute('src', './assets/maop.png')
            this.icomAmpliarReducirFoto.classList.toggle('fa-search-minus')
            this.icomAmpliarReducirFoto.classList.toggle('fa-search-plus')
        }
        else {
            this.oFotoQuienSoy.classList.add('ampliada')
            this.oFotoQuienSoy.setAttribute('src', './assets/maop-big.png')
            this.icomAmpliarReducirFoto.classList.toggle('fa-search-plus')
            this.icomAmpliarReducirFoto.classList.toggle('fa-search-minus')
        }
    }    

}
