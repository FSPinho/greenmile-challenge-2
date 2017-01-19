import { Question } from './question'

export class QuestionLongText extends Question {

	constructor(text, defaultValue) {
		super("QuestionLongText", text, defaultValue);
	}

	onRendered() {
		super.onRendered();
		
		let element = this.getElement();
		if(element) {
			let inputValue = element.querySelector(`textarea[name=${this._id}]`);
			if(inputValue && this._editing) {
				inputValue.addEventListener('keyup', () => this._value = inputValue.value);
				inputValue.addEventListener('change', () => this._value = inputValue.value);
			}
		}
	}

	getInputTemplate() {
		return `<textarea class="form-input" name="${this._id}">${this._value}</textarea>`
	}

}

