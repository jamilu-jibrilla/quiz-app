import { data } from "./data.js"
const a = document.querySelector("#a")
const b = document.querySelector("#b")
const c = document.querySelector("#c")
const d = document.querySelector("#d")
const question  = document.querySelector("#question")
const questionNo = document.querySelector(".questionNo")
const quizContainer = document.querySelector(".quiz-container")
const options = Array.from(document.querySelector(".options").children)
const quizData = data

let currentIndex = 0;
let questionNoValue = currentIndex + 1
let score = 0;
let controller = true

function loadQuiz() {
    const currentQuestion = quizData[currentIndex];
    a.textContent = currentQuestion.a
    b.textContent = currentQuestion.b
    c.textContent = currentQuestion.c
    d.textContent = currentQuestion.d
    question.textContent = currentQuestion.question
    questionNo.textContent= `Question ${questionNoValue} of ${data.length}`
} 
 
function checkAnswer(e) {
    if(e.target.id === quizData[currentIndex].answer) {
        return true
    }
}
//this handles the effect of listening to event on answers until the settimeout is completed to avoid
function preventDoubleClickBug(val) {
    switch (val) {
        case "start":
            controller = false
            break;
        case "end":
            setTimeout(() => {
                controller = true
            }, 2000);
        break
    }      
}

function nextQuiz(e) {    
    if(currentIndex < quizData.length-1) {
        preventDoubleClickBug("start")
        questionNoValue++
        currentIndex+=1
        loadQuiz()
        e.target.style.animation = "";
        preventDoubleClickBug("end")
        return
    } 
    quizContainer.innerHTML = `<h1>You scored ${score}/${quizData.length}</h2> <button onClick="location.reload()" class="restartBtn">restart</button>`
}




options.forEach(option => {
    option.addEventListener("click", function(e) {
        if(checkAnswer(e)) {
            score++
            e.target.style.animation = "animateCorrectAnswer 4s 1";
        } else {
            e.target.style.animation = "animateWrongAnswer .5s 1";
            e.target.style.animationFillMode = "forwards";
        }
        setTimeout(() => {
            controller ? nextQuiz(e) : "";
        }, 2000);
    })
    
})

loadQuiz()