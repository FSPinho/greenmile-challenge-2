import { Question } from './question'

export class QuestionYesNo extends Question {

	constructor(text, defaultValue) {
		super("QuestionYesNo", text, defaultValue);
	}

	getInputTemplate() {
		return (
			`<input type="checkbox" ${this._value? 'checked': ''} name="${this._id}"/>`
		);
	}

}

