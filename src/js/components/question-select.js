import { Question } from './question'

export class QuestionSelect extends Question {

	constructor(text, defaultValue, values = []) {
		super("QuestionSelect", text, defaultValue);
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
		let changeValues = (value) => {
			this._values = value.replace(/^\s*/g, '').replace(/\s*,\s*/g, ',').split(',');
			if(this._values.length)
				this._value = this._values[0];
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
				<label class="form-label">Valores padrão (Separados por vírgula)</label>
				<input class="form-input" type="text" value="${this._values}" name="values"/>
				<label class="form-label">Valor padrão</label>
				${this._values.length?(
					`<select class="form-select" name="${this._id}">
						${this._values.map(value => 
							`<option value="${value}" ${value == this._value? "selected": ""}/>${value}<br/>`
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
				
				<select class="form-select" value="${this._value}" name="${this._id}">
					${this._values.map(value => 
						`<option value="${value}" name="${this._id}" ${value == this._value? "selected": ""}>${value}</option>`
					)}
				</select>

			</div>`
		);
	}

}

