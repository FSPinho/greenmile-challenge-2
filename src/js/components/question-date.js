import { Question } from './question'

export class QuestionDate extends Question {

	constructor(text, defaultValue) {
		super("QuestionDate", text, defaultValue);
	}

	getInputTemplate() {
		return `<input class="form-input" type="date" value="${this._value}" name="${this._id}"/>`
	}

}

