const questionNum = document.getElementById("question-num");
const question = document.getElementById("question");

const answerA = document.getElementById("mult-choice-a");
const answerB = document.getElementById("mult-choice-b");
const answerC = document.getElementById("mult-choice-c");
const answerD = document.getElementById("mult-choice-d");

const progressPar = document.getElementById("progress-bar");
const submitBtn = document.getElementById("submit-btn");

const progressFill = document.getElementById("progress-fill");


let firstTime = true;
let totalCorrect = 0;

let questions = [  
    {
        question: "What is the Pythagorean Theorem?",
        a: "\\( a^2 + b^2 = c^2 \\)",
        b: "\\( a^2 + b^2 = c^3 \\)",
        c: "\\( a^3 + b^2 = c^4 \\)",
        d: "\\( a^2 + b^2 = c^6 \\)",
        res: "a"
    },
    {
        question: "Which planet is closest to the Sun?",
        a: "Venus",
        b: "Earth",
        c: "Mercury",
        d: "Mars",
        res: "c"
    },
    {
        question: "What is \\( 2 + 2 \\)?",
        a: "\\( 3 \\)",
        b: "\\( 4 \\)",
        c: "\\( 5 \\)",
        d: "\\( 22 \\)",
        res: "b"
    },
    {
        question: "What is the Chain Rule for deriving \\( f(g(x)) \\)?",
        a: "\\( f'(g'(x)) \\)",
        b: "\\( f(g'(x)) \\)",
        c: "\\( f(x) g'(x) \\)",
        d: "\\( f'(g(x)) g'(x) \\)",
        res: "d"
    },
    {
        question: "Integral of the constant function \\( f(x) = k \\) is: ",
        a: "\\( -6.3 \\)",
        b: "\\(  -0.9 \\)",
        c: "\\( 2.16 \\)",
        d: "\\( -1.204 \\)",
        res: "c"
    }
];

let currentQuestion = 0;

function updateProgressBar(index) {
    const progressPercent = ((index) / questions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
}

function loadQuestion(index) {
    const q = questions[index];

    questionNum.innerHTML = `${index + 1}`;
    question.innerHTML = q.question;

    answerA.innerHTML = q.a;
    answerB.innerHTML = q.b;
    answerC.innerHTML = q.c;
    answerD.innerHTML = q.d;

    updateProgressBar(index);

    const radios = document.querySelectorAll('input[name="choice"]');
    radios.forEach(r => r.checked = false);

    if (typeof MathJax !== "undefined") {
        MathJax.typeset();
    }
}

submitBtn.addEventListener('click', (event) => {

    event.preventDefault();
    const selectedInput = document.querySelector('input[name="choice"]:checked');

    if (!selectedInput) {
        showNotification("Pease select an answer", "error");
        return;
    }

    const selected = selectedInput.value;
    const correct = questions[currentQuestion].res;

    if (selected === correct) {
        showNotification("Correct!", "success");
        if (firstTime) {
            totalCorrect++;
        }

        firstTime = true;
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion(currentQuestion);
        } else {
            updateProgressBar(currentQuestion);
            showNotification(`Quiz complete! You got a ${totalCorrect}/${questions.length}`, "success");
            
            submitBtn.disabled = true;
            document.querySelectorAll('input[name="choice"]').forEach(input => input.disabled = true);

            setTimeout(() => {
            window.location.href = "finished.html";
            }, 2000); 
        }
    } else {
        firstTime = false;
        showNotification("Incorrect! Try again.", "error");
    }
});

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const messageElem = document.getElementById('notification-message');
    messageElem.textContent = message;
    notification.classList.remove('success', 'error');
    notification.classList.add(type, 'show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}


// Start the quiz
loadQuestion(currentQuestion);
