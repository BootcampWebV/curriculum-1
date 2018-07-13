import { Index } from './index.js'
import { Tareas } from './tareas.js'

export class Main {

    constructor () {

        this.page = window.location.pathname
        this.page = this.page.substr(this.page.lastIndexOf('/')+1,this.page.length)

        if (this.page === 'index.html') {
            new Index()
        } else if (this.page === 'tareas.html') {
            new Tareas()
        }
    }    

}