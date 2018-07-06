(function() {
    window.addEventListener('load', function() {
        /*
        let secciones = document.querySelectorAll('#menu a');
        secciones.forEach((seccion) => {
            seccion.addEventListener('click', (event) => {
                event.preventDefault();
                let enlace = event.currentTarget.getAttribute('data-enlace');
                let elem = document.querySelector(`#${enlace}`);
                elem.scrollIntoView({ 
                    behavior: 'smooth' 
                })
            })
        })
        */

        window.addEventListener('scroll', () => {
            console.log(window.pageYOffset);
            let menu = document.querySelector("#menu");
            let flechaArriba = document.querySelector("body footer a");
            if (window.pageYOffset > 100) {
                menu.classList.add('arriba');
                flechaArriba.classList.remove('oculto');
            }
            else {
                menu.classList.remove('arriba');
                flechaArriba.classList.add('oculto');
            }
        })

        let items = document.querySelectorAll('#menu a');
        items.forEach(item => {
            item.addEventListener('click', (event) => {
                console.log(event.currentTarget.getAttribute('data-enlace'));
                smoothScroll(event.currentTarget.getAttribute('data-enlace'));
            })
        });

        function currentYPosition() {
            if (self.pageYOffset) 
                return self.pageYOffset;
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            if (document.body.scrollTop) 
                return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }
        
        function smoothScroll(eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            console.log(speed);
            if (speed >= 20) speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i = startY; i < stopY; i += step ) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step; 
                    if (leapY > stopY) 
                        leapY = stopY; 
                    timer++;
                } return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; 
                if (leapY < stopY) 
                    leapY = stopY; 
                timer++;
            }
        }    
    })
})()

