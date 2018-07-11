export class Navegacion {

    constructor() {
        // Elementos del DOM
        this.menu = document.querySelector("#menu");
        this.menuIcon = document.querySelector('.menu-icon');
        this.navSecciones = document.querySelectorAll('.menu-principal a');
        this.secciones = document.querySelectorAll("section");
        this.btnInicio = document.querySelector("#btn-inicio");

        this.portadaNombre = document.querySelector(".portada-nombre");
        this.portadaCurriculum = document.querySelector(".portada-curriculum");

        this.oFotoQuienSoy = document.querySelector('.foto-quien-soy');

        // Posiciones de inicio en el scroll para cada sección
        this.offsets = []

        // inicializar event listeners y navegación
        this.defineEventListeners()
        this.prepararNavegacion()
    }

    defineEventListeners() {

        this.navSecciones.forEach(enlaceSeccion => {
            enlaceSeccion.addEventListener('click', (event) => {
                this.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
            })
        });

        // Volver al inicio de la página
        this.btnInicio.addEventListener('click', (event) => {
            this.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
        })

        // Desplegar/replegar menú lateral
        this.menuIcon.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            this.menu.classList.toggle('menu-visible');
        })

        // Recalcular las posiciones de las secciones al cambiar el tamaño de la pantalla o la orientación
        window.addEventListener('resize', this.prepararNavegacion.bind(this))
        window.addEventListener('orientationchange', this.prepararNavegacion.bind(this));

        // Seleccionar la sección activa en el menú al hacer scroll
        window.addEventListener('scroll', this.changeActiveMenuItem.bind(this))

        // Cerrar menú lateral si está desplegado, al hacer click fuera del mismo
        document.body.addEventListener('click', this.closeMenu.bind(this))

        // Ampliar foto
        this.oFotoQuienSoy.addEventListener('click', this.ampliarFoto)
    }

    closeMenu(event) {
        event.stopPropagation();
        const tipoNodo = event.target.nodeName;
        if (this.menu.classList.contains('menu-visible') && tipoNodo != 'A' && tipoNodo != 'I')
            this.menu.classList.remove('menu-visible');
    }
    
    changeActiveMenuItem () {
        // Calcular en qué sección está el scroll
        let desplazamiento = 5
        let pageOffset = window.pageYOffset + Math.max(100, window.innerHeight / desplazamiento) // + (window.innerHeight / desplazamiento)
        let menuItem = 0
        if (pageOffset >=  this.offsets['#home'] && pageOffset < this.offsets['#quien-soy']) {
            menuItem = 0
        } else if (pageOffset >= this.offsets['#quien-soy'] && pageOffset < this.offsets['#estudios']) {
             menuItem = 1
        } else if (pageOffset >= this.offsets['#estudios'] && pageOffset < this.offsets['#experiencia']) {
            menuItem = 2
        } else if (pageOffset >= this.offsets['#experiencia'] && pageOffset < this.offsets['#sobre-mi']) {
            menuItem = 3
        } else if (pageOffset >= this.offsets['#sobre-mi'] && pageOffset < this.offsets['#contacto']) {
            menuItem = 4
        } else {
            menuItem = 5
        }
        // Desactivar todas las secciones del menú y activar sólo en la que está el scroll
        this.navSecciones.forEach(
            (item) => item.classList.remove('active')
        )
        this.navSecciones[menuItem].classList.add('active')

        // Si el scroll no está en el inicio de la página, mostrar el botón Inicio
        if (window.pageYOffset > 100) {
            this.btnInicio.classList.remove('oculto');
        }
        else {
            this.btnInicio.classList.add('oculto');
        }

        // Si volvemos al inicio, reiniciamos la animación, clonando los elementos animados y sustituyendo los antiguos por los clones
        if (window.pageYOffset == 0) {
            var clonNombre = this.portadaNombre.cloneNode(true);
            var clonCurriculum = this.portadaCurriculum.cloneNode(true);
            this.portadaNombre.parentNode.replaceChild(clonNombre, this.portadaNombre);
            this.portadaCurriculum.parentNode.replaceChild(clonCurriculum, this.portadaCurriculum);
            this.portadaNombre = clonNombre;
            this.portadaCurriculum = clonCurriculum;
        }
        this.pageOffset = window.pageYOffset


    }

    prepararNavegacion() {
        this.lastScroll = window.pageYOffset;
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
        return top; // + (window.innerWidth >= 900 ? 60 : 0); // - 100;
    };

    currentYPosition() {
        if (this.pageYOffset) 
            return this.pageYOffset;
        if (document.documentElement && document.documentElement.scrollTop)
            return document.documentElement.scrollTop;
        if (document.body.scrollTop) 
            return document.body.scrollTop;
        return 0;
    }
    
    elmYPosition(eID) {
        let elm = document.getElementById(eID);
        let y = elm.offsetTop;
        let node = elm;
        while (node.offsetParent && node.offsetParent != document.body) {
            node = node.offsetParent;
            y += node.offsetTop;
        } 
        return y - 65;
    }
    
    smoothScroll(eID) {
        let startY = this.currentYPosition();
        let stopY = this.elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); 
            return;
        }
        let speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 25);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; 
                if (leapY > stopY) 
                    leapY = stopY; 
                timer++;
            } 
            return;
        }
        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; 
            if (leapY < stopY) 
                leapY = stopY; 
            timer++;
        }
    } 

    ampliarFoto(event) {
        if (this.classList.contains('foto-ampliada')) {
            this.classList.remove('foto-ampliada')
            this.setAttribute('src', './assets/maop.png')
        }
        else {
            this.classList.add('foto-ampliada')
            this.setAttribute('src', './assets/maop-big.png')
        }
    }
}