import { Question } from './question'

export class QuestionNumeric extends Question {

	constructor(text, defaultValue) {
		super("QuestionNumeric", text, defaultValue);
	}

	getInputTemplate() {
		return `<input class="form-input" type="number" value="${this._value}" name="${this._id}"/>`
	}

}

