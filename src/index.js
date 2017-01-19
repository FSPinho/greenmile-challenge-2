import { App } from './js/app'

let app = new App();

/* Renderizando o componente como filho do body */
app.renderIn(document.getElementById("app-root"));