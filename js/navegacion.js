import { SmoothScroll } from './smooth-scroll.js';

export class Navegacion {

    constructor(pagina) {

        // Propiedad pasada en el constructor, que indica desde que página se invoca
        this.pagina = pagina;

        // Elementos del DOM
        this.menu = document.querySelector("#menu");
        this.menuIcon = document.querySelector('.menu-icon');
        this.navSecciones = document.querySelectorAll('.menu-principal a');
        this.secciones = document.querySelectorAll("section");
        this.btnInicio = document.querySelector("#btn-inicio");

        // La recarga de la animación de la portada sólo se hace en la página index
        if (this.pagina == 'index') {
            this.portadaNombre = document.querySelector("main section.home header h1");
            this.portadaCurriculum = document.querySelector("main section.home header h2");
            this.portadaFoto = document.querySelector("main section.home header img");
        }

        // Posiciones de inicio en el scroll para cada sección
        this.offsets = []

        // Inicializar event listeners y navegación
        this.defineEventListeners()
        this.prepararNavegacion()
        this.scrollController()

        // controlador de smooth scroll
        this.smoothScrollHandler = new SmoothScroll();
    }

    defineEventListeners() {
        
        // Eventos click para los enlaces a las secciones en el menú
        this.navSecciones.forEach(enlaceSeccion => {
            enlaceSeccion.addEventListener('click', (event) => {
                const enlace = event.currentTarget.getAttribute('data-enlace');
                if (enlace) {
                    event.preventDefault();
                    this.smoothScrollHandler.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
                }
            })
        });

        // Evento click para el botón de volver al inicio de la página
        this.btnInicio.addEventListener('click', (event) => {
            this.smoothScrollHandler.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
        })

        // Evento click para desplegar/replegar el menú lateral
        this.menuIcon.addEventListener('click', (event) => {
            event.preventDefault();
            this.menu.classList.toggle('menu-visible');
        })

        // Recalcular las posiciones de las secciones al cambiar el tamaño de la pantalla o la orientación
        window.addEventListener('resize', this.prepararNavegacion.bind(this))
        window.addEventListener('orientationchange', this.prepararNavegacion.bind(this));

        // Seleccionar la sección activa en el menú al hacer scroll
        window.addEventListener('scroll', this.scrollController.bind(this))

        // Cerrar menú lateral si está desplegado, al hacer click en el body, fuera del mismo
        document.body.addEventListener('click', this.closeMenu.bind(this))
    }

    closeMenu(event) {

        event.stopPropagation();
        //event.preventDefault();
        const tipoNodo = event.target.nodeName;
        if (this.menu.classList.contains('menu-visible') && tipoNodo != 'A' && tipoNodo != 'I') {
            this.menu.classList.remove('menu-visible');
        }
    }
    
    scrollController() {

        // El Scroll spy sólo se hace en la página index
        if (this.pagina == 'index') {
            // Calcular en qué sección está el scroll
            let desplazamiento = 10

console.log(Math.max(30, window.innerHeight / desplazamiento))

            let pageOffset = window.pageYOffset + Math.max(100, window.innerHeight / desplazamiento)
            let menuItem = 0
            if (pageOffset >=  this.offsets['#home'] && pageOffset < this.offsets['#quien-soy']) {
                menuItem = 0
            } else if (pageOffset >= this.offsets['#quien-soy'] && pageOffset < this.offsets['#estudios']) {
                menuItem = 1
            } else if (pageOffset >= this.offsets['#estudios'] && pageOffset < this.offsets['#experiencia']) {
                menuItem = 2
            } else if (pageOffset >= this.offsets['#experiencia'] && pageOffset < this.offsets['#contacto']) {
                menuItem = 3
            } else {
                menuItem = 4
            }
            // Desactivar todas las secciones del menú y activar sólo en la que está el scroll
            this.navSecciones.forEach(
                (item) => item.classList.remove('active')
            )
            this.navSecciones[menuItem].classList.add('active')

            this.pageOffset = window.pageYOffset

            // Comprobar si estamos al inicio de la página
            this.reiniciarAnimacion()
        }

        // Si el scroll no está en el inicio de la página, mostrar el botón Inicio
        this.comprobarInicio()


    }

    comprobarInicio() {

        if (window.pageYOffset > 100) {
            this.btnInicio.classList.remove('oculto');
        }
        else {
            this.btnInicio.classList.add('oculto');
        }        
    }

    reiniciarAnimacion() {

        // Si volvemos al inicio, reiniciamos la animación de los títulos, clonando los elementos animados y sustituyendo los antiguos por los clones
        if (window.pageYOffset == 0 && this.portadaNombre) {
            let clonNombre = this.portadaNombre.cloneNode(true);
            clonNombre.classList.add('animacion-nombre');

            let clonCurriculum = this.portadaCurriculum.cloneNode(true);
            clonCurriculum.classList.add('animacion-curriculum');
            
            this.portadaNombre.parentNode.replaceChild(clonNombre, this.portadaNombre);
            this.portadaNombre = clonNombre;
            
            this.portadaCurriculum.parentNode.replaceChild(clonCurriculum, this.portadaCurriculum);
            this.portadaCurriculum = clonCurriculum;
        }
    }

    prepararNavegacion() {

        this.secciones.forEach(
            (item) => {
                let cumulative =  this.cumulativeOffset(item);
                this.offsets['#'+item.id] = cumulative;
            }
        )
    }

    cumulativeOffset (element) {

        var top = 0;
        do {
            top += element.offsetTop || 0;
            element = element.offsetParent;
        } while(element);
        return top;
    };
}