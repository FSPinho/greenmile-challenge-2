import { Question } from './question'

export class QuestionDateTime extends Question {

	constructor(text, defaultValue) {
		super("QuestionDateTime", text, defaultValue);
	}

	getInputTemplate() {
		return `<input class="form-input" type="datetime-local" value="${this._value}" name="${this._id}"/>`
	}

}

