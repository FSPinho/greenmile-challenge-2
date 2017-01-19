import { Question } from './question'

export class QuestionSelectMultiple extends Question {

	constructor(text, defaultValue = [], values = []) {
		super("QuestionSelectMultiple", text, defaultValue);
		this._values = values;
	}

	get values() {
		return this._values;
	}

	set values(values) {
		this._values = values;
	}

	onRendered() {
		super.onRendered();
		
		let element = this.getElement();
		let getSelectedValues = (options) => {
			let selected = [];
			for(let i = 0; i < options.length; i++)
				if(options[i].selected)
					selected.push(options[i].value);
			return selected;
		}
		let changeValues = (value) => {
			this._values = value.replace(/^\s*/g, '').replace(/\s*,\s*/g, ',').split(',');
		}
		if(element) {
			let inputValues = element.querySelector(`input[name="values"]`);
			if(inputValues && this._editing) {
				inputValues.addEventListener('keyup', () => changeValues(inputValues.value));
				inputValues.addEventListener('change', () => changeValues(inputValues.value));
				inputValues.addEventListener('blur', () => this.update());
			}

			let inputValue = element.querySelector(`select[name=${this._id}]`);
			if(inputValue && this._editing) {
				inputValue.addEventListener('change', () => this.value = getSelectedValues(inputValue.options));
			}
		}

	}

	getTemplate(context) {
		return this._editing? 
		(
			`<div class="form-question">
				<label class="form-label">Texto da pergunta</label>
				<input class="form-input" type="text" value="${this._text}" name="text"/>
				<label class="form-label">Valores padrão (Separados por vírgula)</label>
				<input class="form-input" type="text" value="${this._values}" name="values"/>
				<label class="form-label">Valor padrão</label>
				${this._values.length?(
					`<select multiple class="form-select" name="${this._id}">
						${this._values.map(value => 
							`<option value="${value}" ${this._value.indexOf(value) > -1? "selected": ""}/>${value}<br/>`
						)}
					</select>`
				):''}
				<button type="button" class="form-question-remove accent icon top-right">
					<i class="material-icons">delete</i>
				</button>
			</div>`
		):(
			`<div class="form-question">
				<label class="form-label">${this._text}</label>
				
				${this._values.map(value => 
					`<input type="checkbox" name="${this._id}" ${this._value.indexOf(value) > -1? "checked": ""}>${value}<br/>`
				)}

			</div>`
		);
	}

}

