import { Component } from './component'

export class Question extends Component {
	
	constructor(type = "Question", text = "", defaultValue = "") {
		super();

		this._type = type;
		this._text = text;
		this._value = defaultValue;
		this._editing = true;
	}

	get type() {
		return this._type;
	}

	set type(type) {
		this._type = type;
	}

	get text() {
		return this._text;
	}

	set text(text) {
		this._text = text;
	}

	get value() {
		return this._value;
	}

	set value(value) {
		this._value = value;
	}

	get type() {
		return this._type;
	}

	get editing() {
		return this._editing;
	}

	set editing(editing) {
		this._editing = editing;
	}

	onRendered() {
		let element = this.getElement();
		if(element) {
			let removeButton = element.getElementsByClassName("form-question-remove")[0];
			if(removeButton)
				removeButton.addEventListener('click', (e) => this.emit('remove', this));

			let inputText = element.querySelector('input[name=text]');
			if(inputText) {
				inputText.addEventListener('keyup', () => this._text = inputText.value);
			}

			let inputValue = element.querySelector(`input[name=${this._id}]`);
			if(inputValue && this._editing) {
				inputValue.addEventListener('keyup', () => this._value = inputValue.value);
				inputValue.addEventListener('change', () => this._value = inputValue.value);
			}
		}
	}

	getTemplate(context) {
		return this._editing? 
		(
			`<div class="form-question">
				<label class="form-label">Texto da pergunta</label>
				<input class="form-input" type="text" value="${this._text}" name="text"/>
				<label class="form-label">Valor padrão</label>
				${this.getInputTemplate()}
				<button type="button" class="form-question-remove accent icon top-right">
					<i class="material-icons">delete</i>
				</button>
			</div>`
		):(
			`<div class="form-question">
				<label class="form-label">${this._text}</label>
				${this.getInputTemplate()}
			</div>`
		);
	}

	getInputTemplate() {
		return `<input class="form-input" type="text" value="${this._value}" name="${this._id}"/>`
	}

}