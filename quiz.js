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

Quiz.prototype.gameOn = function() {
	if (this.questionNumber === 0){
		this.shuffleQuestions(this.questionList);
	}
	this.questionList
	
	if (this.questionNumber < this.questionList.length) {
		this.showQuestion(this.questionNumber);
	} else
	{
		console.log ('\n\n\Fin del Juego');
	}
};

Quiz.prototype.shuffleQuestions = function(questionList) {

	for (var i = questionList.length-1; i >=0; i--) {
	     
	        var randomIndex = Math.floor(Math.random()*(i+1)); 
	        var itemAtIndex = questionList[randomIndex]; 
	         
	        questionList[randomIndex] = questionList[i]; 
	        questionList[i] = itemAtIndex;
	    }
	return questionList;
};

Quiz.prototype.showQuestion = function(number) {

		response = {prompt: '\n\n' + this.questionList[number].question + '?\n>', default: 'One single word'};
		read(response, this.checkAnswer.bind(this));
	
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
			console.log(this.questionNumber);
			this.questionNumber++;
			console.log ('CORRECT!!!\n');
			this.gameOn();
		}
		else {
			this.failAnswer();
			this.gameOn();
		}

}

Quiz.prototype.failAnswer = function() {
	var failMessagges = ['No, no!\n', 'Give it another try\n', 
						'Not your better day\n', 'Do you want to surrender?\n'];
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

quiz.gameOn();

