const numbers = "0123456789".split("");  // Array of numbers
let currentIndex = 0;  // Start from '0'
let quizQuestions = [];
let currentQuestionIndex = 0;

const numberElement = document.getElementById("number");
const signImageElement = document.getElementById("sign-image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const learningMode = document.getElementById("learning-mode");
const quizMode = document.getElementById("quiz-mode");
const quizImageElement = document.getElementById("quiz-image");
const optionButtons = document.querySelectorAll(".option-btn");
const quizResult = document.getElementById("quiz-result");

// Function to update number and image
function updateNumber() {
    numberElement.textContent = numbers[currentIndex];
    signImageElement.src = `images/${numbers[currentIndex]}.jpg`;
}

// Function to generate quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];
    while (selectedQuestions.length < 5) {
        let number = numbers[Math.floor(Math.random() * numbers.length)];
        if (!selectedQuestions.includes(number)) {
            selectedQuestions.push(number);
        }
    }

    quizQuestions = selectedQuestions.map(number => {
        let options = [number];
        while (options.length < 4) {
            let randomOption = numbers[Math.floor(Math.random() * numbers.length)];
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            number: number,
            image: `images/${number}.jpg`,
            options: options
        };
    });
}

// Function to load quiz question
function loadQuizQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        alert("Quiz completed! Restarting...");
        currentQuestionIndex = 0;
        learningMode.style.display = "block";
        quizMode.style.display = "none";
        currentIndex = 0;
        updateNumber();
        return;
    }

    let question = quizQuestions[currentQuestionIndex];
    quizImageElement.src = question.image;
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
    });

    quizResult.textContent = "";
}

// Function to check quiz answer
function checkAnswer(button) {
    let correctNumber = quizQuestions[currentQuestionIndex].number;
    if (button.textContent === correctNumber) {
        quizResult.textContent = "Correct!";
        quizResult.style.color = "green";
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuizQuestion();
        }, 1000);
    } else {
        quizResult.textContent = "Wrong! Try Again.";
        quizResult.style.color = "red";
    }
}

// Event listeners for buttons
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateNumber();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < numbers.length - 1) {
        currentIndex++;
        updateNumber();
    } else {
        // Start quiz after last number
        generateQuizQuestions();
        learningMode.style.display = "none";
        quizMode.style.display = "block";
        currentQuestionIndex = 0;
        loadQuizQuestion();
    }
});

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < numbers.length - 1) {
                currentIndex++;
                updateNumber();
            } else {
                generateQuizQuestions();
                learningMode.style.display = "none";
                quizMode.style.display = "block";
                currentQuestionIndex = 0;
                loadQuizQuestion();
            }
        }
    } else if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
            currentIndex--;
            updateNumber();
        }
    }
});
