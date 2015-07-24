var read = require('read');
//var prompt = require('prompt');

var Question = function (question, answer, questionId) {
	this.question = question;
	this.answer = answer;
	this.questionId = questionId;
	this.points = 5;

}

var Quiz = function () {
	this.questionList = [];
	this.questionNumber = 0;
	this.totalPoints = 0;
	this.start = true;

}

Quiz.prototype.gameOn = function() {
	if (this.start === true){
		this.shuffleQuestions(this.questionList);
	}
	//console.log(this.questionNumber);
	
	if (this.questionNumber < this.questionList.length) {
		this.showQuestion(this.questionNumber);
	} else
	{
		console.log ('\n\n\End of the Game\n\n Yout earned a total of ' + this.totalPoints + ' points!');
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
			this.totalPoints += this.questionList[this.questionNumber].points;
			console.log('Points: ' + this.totalPoints);
			this.questionNumber++;
			console.log ('CORRECT!!!\n');
			this.start = false;
			this.gameOn();
		}
		else {
			this.failAnswer();
			this.start = false;
			this.gameOn();
		}

}

Quiz.prototype.failAnswer = function() {
	var failMessagges = ['No, no!\n', 'Give it another try\n', 
						'Not your better day\n', 'Do you want to surrender?\n'];
	var failMessagge = failMessagges[Math.floor(Math.random()*failMessagges.length)];
	this.questionList[this.questionNumber].points--;
	console.log (failMessagge);
};

var question1 = new Question ('The country of Italy includes two major islands. Which is the largest one?',
							'Sicily', 1);
var question2 = new Question ('How may legs has a common dog?', '4', 2);
var question3 = new Question ('What nationality was Chopin?', 'Polish', 3);
var question4 = new Question ('What year did Elvis Presley die?', '1977', 4);
var question5 = new Question ('Which is the largest ocean?', 'Pacific', 5);
var question6 = new Question ('What money do they use in Japan?', 'Yen', 6);
var question7 = new Question ('How many months have 28 days?', '12',	7);
var question8 = new Question ('Which is the only mammal that is not capable of jumping?',
							 'Elephant', 8);
var question9 = new Question ('Who said E=mc2?', 'Einstein', 9);
var question10 = new Question ('Who said, "Vini, vidi, vici"?', 'Caesar',	10);


var quiz = new Quiz();
quiz.addQuestion([question1 ,question2, question3, question4, question5,
				 question6, question7, question8, question9, question10]);

quiz.gameOn();

