// questions and answers
const questions = [
    {
        question: "What is JavaScript primarily used for?",
        answers: [
            "Styling web pages", 
            "Adding interactivity to web pages", 
            "Creating databases", 
            "Sending emails"],
        correct: 1,
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            "<scripting>", 
            "<javascript>", 
            "<script>", 
            "<js>"],
        correct: 2,
    },
    {
        question: "What is the correct way to comment out a single line of code in JavaScript?",
        answers: [
            "// This is a comment", 
            "/* This is a comment */", 
            "# This is a comment", 
            "<!-- This is a comment -->"],
        correct: 0,
    },
    {
        question: "Which of the following is a JavaScript data type?",
        answers: [
            "String", 
            "Integer", 
            "Boolean", 
            "All of the above"],
        correct: 3,
    },
    {
        question: "In JavaScript, which method is used to remove the last element from an array?",
        answers: [
            "removeLast()", 
            "pop()", 
            "shift()", 
            "slice()"],
        correct: 1,
    },
];

// variables
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-button");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timeLeftElement = document.getElementById("time-left");
const gameOverElement = document.getElementById("game-over");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const highScoresButton = document.getElementById("high-scores");
const homeButton = document.getElementById("home");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60;
let timer;

// start quiz button
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    quizContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    displayQuestion();
    startTimer();
}

// display questions and answers
function displayQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    answersElement.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => checkAnswer(index));
        answersElement.appendChild(li);
    });
}

// check answer
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestion];
    if (selectedIndex === question.correct) {
        score++;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        // show alert when a wrong answer is clicked
        alert("Wrong answer. Try again.");
        timeLeft -= 5;
        if (timeLeft < 0) {
            timeLeft = 0;
        }
    }
}

// timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

// end quiz
function endQuiz() {
    clearInterval(timer);
    questionContainer.classList.add("hidden");
    if (timeLeft === 0) {
        gameOverElement.classList.remove("hidden");
    } else {
        scoreContainer.classList.remove("hidden");
        scoreElement.textContent = timeLeft;
    }
}

// save score button
saveScoreButton.addEventListener("click", saveScore);

function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials, score: timeLeft });
        localStorage.setItem("highScores", JSON.stringify(highScores));
        initialsInput.value = "";
    }
}

// high score button
highScoresButton.addEventListener("click", () => {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const highScoresList = highScores
        .sort((a, b) => b.score - a.score)
        .map((entry) => `${entry.initials}: ${entry.score}`)
        .join("\n");
    alert(highScoresList || "No high scores yet.");
});

// home button
homeButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    gameOverElement.classList.add("hidden");
    scoreContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
});
