import { Component } from './component'
import { QuestionDate } from './question-date'
import { QuestionDateTime } from './question-datetime'
import { QuestionLongText } from './question-long-text'
import { QuestionNumeric } from './question-numeric'
import { QuestionRating } from './question-rating'
import { QuestionSelect } from './question-select'
import { QuestionSelectMultiple } from './question-select-multiple'
import { QuestionShortText } from './question-short-text'
import { QuestionYesNo } from './question-yes-no'

export class Section extends Component {

	constructor(title = "Sem título", questions = []) {
		super();

		this._title = title;
		this._questions = questions;
		this._editing = true;

		this._QUESTION_TYPES = [
			["Data", "D"], 
			["Data e Hora", "DT"], 
			["Texto Curto", "ST"], 
			["Texto Longo", "LT"], 
			["Numero", "N"], 
			["Classificação", "R"], 
			["Seleção", "S"],  
			["Seleção Múltipla", "SM"], 
			["Sim ou não", "YN"]
		];
	}

	get title() {
		return this._title;
	}

	set title(title) {
		this._title = title;

		update();
	}

	get questions() {
		return this._questions;
	}

	set questions(questions) {
		this._questions = questions;

		update();
	}

	get editing() {
		return this._editing;
	}

	set editing(editing) {
		this._editing = editing;
		this._questions.forEach((question) => question.editing = editing);
	}

	addQuestion(question) {
		this._questions.push(question);
		question.addListener('remove', () => this.removeQuestion(question.id));
		this.update();
	}

	removeQuestion(questionId) {
		let index = -1;
		this._questions.forEach((question, i) => {
			if(question.id == questionId) {
				index = i;
			}
		});
		if(index !== -1) {
			this._questions.splice(index, 1);
			this.update();
		}
	}

	onRendered() {
		let element = this.getElement();
		if(element) {
			let removeButton = element.getElementsByClassName("form-section-remove")[0];
			if(removeButton)
				removeButton.addEventListener('click', (e) => this.emit('remove', this));

			let addBtn = element.getElementsByClassName("form-question-add")[0];
			if(addBtn) {
				addBtn.addEventListener('click', () => {
					let inputType = element.getElementsByClassName("form-question-type")[0];
					if(inputType) {
						let type = inputType.value;
						let text = `Texto da Pergunta`;
						switch(type) {
							case "D":
								this.addQuestion(new QuestionDate(text));
								break;
							case "DT":
								this.addQuestion(new QuestionDateTime(text));
								break;
							case "LT":
								this.addQuestion(new QuestionLongText(text));
								break;
							case "N":
								this.addQuestion(new QuestionNumeric(text, 0));
								break;
							case "R":
								this.addQuestion(new QuestionRating(text));
								break;
							case "S":
								this.addQuestion(new QuestionSelect(text));
								break;
							case "SM":
								this.addQuestion(new QuestionSelectMultiple(text));
								break;
							case "ST":
								this.addQuestion(new QuestionShortText(text));
								break;
							case "YN":
								this.addQuestion(new QuestionYesNo(text));
								break;
						}
					}
				});
			}

			let inputTitle = element.querySelector('input[name=title]');
			if(inputTitle) {
				inputTitle.addEventListener('keyup', () => this._title = inputTitle.value);
			}
		}
	}

	getTemplate(context) {
		
		return this._editing?
		(
			`<div class="form-section" id="${this._id}">
				<label class="form-label">Título da seção</label>
				<input class="form-input" type="text" value="${this._title}" name="title"/>
				<button type="button" class="form-section-remove accent icon top-right">
					<i class="material-icons">delete</i>
				</button>
				${this._questions.map(question => question.render(context))}

				<button type="button" class="form-question-add">Adicionar Pergunta</button>
				do tipo 
				<select class="form-question-type">
					${this._QUESTION_TYPES.map((type) => `<option value="${type[1]}">${type[0]}</option>`)}
				</select>
			</div>`
		):(
			`<div class="form-section">
				<h3>${this._title}</h3>
				${this._questions.map(question => question.render(context))}
			</div>`
		);
	}

}