import { Component } from './component'
import { Section } from './section'

export class Form extends Component {

	constructor(title = "", sections = []) {
		super();

		this._title = title;
		this._sections = sections;
		this._editing = false;
	}

	get title() {
		return this._title;
	}

	set title(title) {
		this._title = title;
	}

	get sections() {
		return this._sections;
	}

	set sections(sections) {
		this._sections = sections;
	}

	get editing() {
		return this._editing;
	}

	set editing(editing) {
		this._editing = editing;
		this._sections.forEach((section) => section.editing = editing);
		this.update();
	}

	addSection(section) {
		this._sections.push(section);
		section.addListener('remove', () => this.removeSection(section.id));
		this.update();
	}

	removeSection(sectionId) {
		let index = -1;
		this.sections.forEach((section, i) => {
			if(section.id == sectionId) {
				index = i;
			}
		});
		if(index !== -1) {
			this._sections.splice(index, 1);
			this.update();
		}
	}

	onRendered() {
		let element = this.getElement();
		if(element) {
			let addBtn = element.getElementsByClassName("form-section-add")[0];
			if(addBtn) {
				addBtn.addEventListener('click', () => this.addSection(new Section("Nova Seção")));
			}

			let finishBtn = element.getElementsByClassName("form-finish")[0];
			if(finishBtn) {
				finishBtn.addEventListener('click', () => this.editing = false);
			}

			let editBtn = element.getElementsByClassName("form-edit")[0];
			if(editBtn) {
				editBtn.addEventListener('click', () => this.editing = true);
			}

			let inputTitle = element.querySelector('input[name=title]');
			if(inputTitle) {
				inputTitle.addEventListener('keyup', () => this._title = inputTitle.value);
			}
		}
	}

	getTemplate(context) {
		return this._editing?
		 `
			<form class="form" id="${this._id}">
				<label class="form-label">Título do formulário</label>
				<input class="form-input" type="text" value="${this._title}" name="title"/>
				${this._sections.map(section => section.render(context))}
				<button type="button" class="form-section-add">Adicionar Seção</button>
				<button type="button" class="form-finish">Terminar edição</button>
			<form>
		`:`
			<form class="form">
				<h1>${this._title}</h1>
				<button type="button" class="form-edit">Editar</button>
				${this._sections.map(section => section.render(context))}
			<form>
		`
	}

}