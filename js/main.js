export class Main {

    constructor () {
        // enlaces a secciones del menú de navegación
        /*
        this.linkHome = document.querySelector('#link-home')
        this.linkQuienSoy =  document.querySelector('#link-quien-soy')
        this.linkEstudios =  document.querySelector('#link-estudios')
        this.linkExperiencia =  document.querySelector('#link-experiencia')
        this.linkSobreMi =  document.querySelector('#link-sobre-mi')
        this.linkContacto =  document.querySelector('#link-contacto')
        */

        this.menu = document.querySelector("#menu");

        this.menuIcon = document.querySelector('.menu-icon');

        this.navSecciones = document.querySelectorAll('.menu-principal a');

        this.secciones = document.querySelectorAll("section");

        this.btnInicio = document.querySelector("#btn-inicio");


        console.log(this.secciones);

        this.offsets = []

        this.defineEventListeners()
        this.prepararNavegacion()
    }

    defineEventListeners() {
        /*
        this.navSecciones.forEach((enlaceSeccion) => {
            enlaceSeccion.addEventListener('click', (event) => {
                event.preventDefault();
                let enlace = event.currentTarget.getAttribute('data-enlace');
                let destino = document.querySelector(`#${enlace}`);
                destino.scrollIntoView({ 
                    behavior: 'smooth' 
                })
            })
        })
        */
        this.navSecciones.forEach(enlaceSeccion => {
            enlaceSeccion.addEventListener('click', (event) => {
                this.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
            })
        });

        this.btnInicio.addEventListener('click', (event) => {
            this.smoothScroll(event.currentTarget.getAttribute('data-enlace'));
        })

        this.menuIcon.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.menu.classList.contains('menu-visible')) {
                this.menu.classList.remove('menu-visible')
                this.menu.classList.add('menu-oculto')
            }
            else {
                this.menu.classList.remove('menu-oculto')
                this.menu.classList.add('menu-visible')
            }
        })

        window.addEventListener('resize', this.prepararNavegacion.bind(this))
        window.addEventListener('scroll', this.changeMenuStyle.bind(this))

        window.addEventListener('orientationchange', this.prepararNavegacion.bind(this));

    }

    verOlderPosts(oE) {
        console.dir(oE)
    }

    toggleMenu() {
        document.querySelector('#top-menu').classList.toggle('menu-top')
    }

    probarInput(oE) {
        if(oE.type == "change") {
            console.log('change')
            console.dir(oE.target.value)
        } else if (oE.type == "input") {
            console.log('input')
            console.dir(oE.target.value)
        }
    }

    changeMenuStyle () {
        let desplazamiento = 5
        let pageOffset = window.pageYOffset + Math.max(100, window.innerHeight / desplazamiento); // + (window.innerHeight / desplazamiento)
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

        this.navSecciones.forEach(
            (item) => item.classList.remove('active')
        )
        this.navSecciones[menuItem].classList.add('active')

        if (window.pageYOffset > 100) {
            this.btnInicio.classList.remove('oculto');
        }
        else {
            this.btnInicio.classList.add('oculto');
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
        return top; // - (window.innerWidth >= 900 ? 60 : 0); // - 100;
    };

    currentYPosition() {
        if (self.pageYOffset) 
            return self.pageYOffset;
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
        return y - (window.innerWidth >= 900 ? 60 : 10);
    }
    
    smoothScroll(eID) {
        let startY = this.currentYPosition();
        let stopY = this.elmYPosition(eID);
        let distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        let speed = Math.round(distance / 100);
        console.log(speed);
        if (speed >= 20) speed = 20;
        let step = Math.round(distance / 30);
        let leapY = stopY > startY ? startY + step : startY - step;
        let timer = 0;
        if (stopY > startY) {
            for (let i = startY; i < stopY; i += step ) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY += step; 
                if (leapY > stopY) 
                    leapY = stopY; 
                timer++;
            } return;
        }
        for (let i = startY; i > stopY; i -= step) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; 
            if (leapY < stopY) 
                leapY = stopY; 
            timer++;
        }
    }       

    leerContact(oE) {
        oE.preventDefault()
        let form = new FormContact()
        form.guardarDatos()
    }
}