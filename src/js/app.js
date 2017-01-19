require('../css/app.css'); 

import { Component } from './components/component'
import { Form } from './components/form'

export class App extends Component {

	constructor() {
		super();

		this._form = new Form("Formulário");
	}

	/* Sobrescrita do método da classe pai, responsável por construir o
	   template HTML do componente e é chamado pelo método render() da
	   classe Component */
	/* context é uma variàvel do tipo EventEmitter, responsável
	   por alertar os componentes sobre o término da renderização */
	getTemplate(context) {
		/* O context é passado para os subcomponentes, que se 'inscrevem'
		   no evento de renderização */
		return `<div class="app-root">${this._form.render(context)}<div>`;
	}

}
