import { EventEmitter } from '../event-emitter'

export class Component extends EventEmitter {

	constructor() {
		super();

		/* Cada componente possui um id único usado para seleção no DOM */
		this._id = `component-${Component.SERIAL++}`;
	}

	get id() {
		return this._id;
	}

	/* Retorna a string do template a ser renderizado.
	   Nesse caso o context não é usado, pois não há subcomponentes */
	/* Este método pode ser sobrescrito pelos herdeiros */
	getTemplate(context) {
		return `<div></div>`;
	}

	/* Retorna elemente que já está renderizado */
	getElement() {
		return document.getElementById(this._id);
	}

	/* Retorna elemente pai do elemento renderizado */
	getParent() {
		let element = this.getElement();
		if(element)
			return element.parentNode;
		return null;
	}

	/* Engloba o método getTemplate(), provendo algum tratamento antes da 
	   renderização final */
	/* O primeiro elemento a chamar o render(), cria o context, e é responsável
	   por emitir o evento de renderização quando a mesma se completar */
	render(context) {
		
		if(context)
			/* Me avise quando renderizar... */
			context.addListener('render', () => this.onRendered());

		let template = this.getTemplate(context);
		if(/<[\w\d]+/.test(template)) {
			/* Insere o atributo id no template html e remove uma vírgula
			   chata que eu não consegui tirar */
			template = template
							.replace(/(<[\w\d]+)/, `$1 id="${this._id}"`)
							.replace(/(>)\s*,\s*(<)/g, '$1 $2')
		}
		return template;

	}

	/* Renderiza o atual componente como filho do componente passado como parâmetro */
	/* O valor padrão é o elemento pai que já existe, no caso de o render ser chamado 
	   pelo método update() */
	renderIn(parent = this.getParent()) {
		
		/* Na primeira vez que o update() é chamado, a renderização pode ainda não ter
		   ocorrido e o parent pode ser null */
		if(parent) {
			/* Neste método, o componente atual trabalha como root da renderização, e tem
			   o dever de alertar os demais (que se inscreveram como listeners de context)
			   sobre o término da renderização */
			let context = this;
			context.clearListeners('render');

			/* Acessando o elemento já existente */
			let currentElement = this.getElement();

			/* Renderizando o componente e passando o context para que os subcomponentes possam
			   ser avisados do término da renderização */
			let newElement = document.createElement('div');
			newElement.innerHTML = this.render(context);
			newElement = newElement.childNodes[newElement.childNodes.length - 1];

			/* A rendrização ocorre aqui */
			if(currentElement) {
			    parent.replaceChild(newElement, currentElement);
			} else {
				parent.appendChild(newElement);
			}
			/* Renderização finalizada */

			/* Avisando a todos os componentes que renderização ocorreu */
			context.emit('render');
		}

	}

	/* Método chamado caso alguma coisa mude no componente atual, 
	   por exemplo, quando algum atributo tem o valor modificado */
	update() {

		/* Renderizando novamente o elemento atual */
		this.renderIn();

		/* Chamado sempre que o componente é atualizado */
		this.onUpdated();

	}

	/* Chamando no final do método update, pode ser sobrescrito pelos objetos herdeiros */
	onUpdated() {
		console.log(`Componente ${this._id} atualizado!`);
	}

	/* Chamando após a renderização, pode ser sobrescrito pelos objetos herdeiros */
	/* Usado principalmente para configurar os eventos de click e change
	   que deve ocorrer após a renderização da tela */
	onRendered() {
		console.log(`Componente ${this._id} renderizado!`);
	}

}

Component.SERIAL = 0;