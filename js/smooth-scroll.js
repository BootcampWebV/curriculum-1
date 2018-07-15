export class SmoothScroll {
    
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
        return y - 60;
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
        let step = Math.round(distance / 40);
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
}