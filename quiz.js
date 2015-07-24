var read = require('read');
//var prompt = require('prompt');

var Question = function (question, answer, questionId) {
	this.question = question;
	this.answer = answer;
	this.questionId = questionId;

}

var Quiz = function () {
	this.questionList = [];
	this.questionNumber = 0;

}


Quiz.prototype.showQuestion = function() {
	
	if (this.questionNumber < this.questionList.length) {
		response = {prompt: '\n\n' + this.questionList[this.questionNumber].question + '?\n>', default: 'One single word'};
		read(response, this.checkAnswer.bind(this));
	} else
	{
		console.log ('\n\n\Fin del Juego');
	}
};


Quiz.prototype.addQuestion = function(questions) {
	this.questionList = this.questionList.concat(questions);
	
};
	

Quiz.prototype.checkAnswer = function (err, answer) {
	 	if (err) {
       	throw err;
    	}
		
		var questionAnswer = this.questionList[this.questionNumber].answer;
		//console.log ('Your answer is ' + answer + ', and the right answer is ' +
		//			 questionAnswer);
		
		if (answer.toLowerCase() === questionAnswer.toLowerCase()) {
			this.questionNumber++;
			console.log ('CORRECT!!!\n');
			this.showQuestion(this.questionNumber);
		}
		else {
			this.failAnswer();
			this.showQuestion(this.questionNumber);
		}

}

Quiz.prototype.failAnswer = function() {
	var failMessagges = ['No, no!\n', 'Give it another try\n', 'Not your better day\n', 'Do you want to surrender\n'];
	var failMessagge = failMessagges[Math.floor(Math.random()*failMessagges.length)];
	console.log (failMessagge);
};

var question1 = new Question ('The country of Italy includes two major islands. Which is the largest one?',
							'Sicily',
							1
							);
var question2 = new Question ('How may legs has a common dog?', '4',
							1
							);

var quiz = new Quiz();
//quiz.resetStack();
quiz.addQuestion([question1,question2]);
//quiz.addQuestion(question2);
//console.log(quiz.questionList);

quiz.showQuestion(1);

