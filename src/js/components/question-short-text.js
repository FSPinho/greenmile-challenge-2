import { Question } from './question'

export class QuestionShortText extends Question {

	constructor(text, defaultValue) {
		super("QuestionShortText", text, defaultValue);
	}

	getInputTemplate() {
		return `<input class="form-input" type="text" value="${this._value}" name="${this._id}"/>`
	}

}

