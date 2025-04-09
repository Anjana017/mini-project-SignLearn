const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");  
let currentIndex = 0;  

let quizQuestions = [];
let currentQuestionIndex = 0;

const alphabetElement = document.getElementById("alphabet");
const signImageElement = document.getElementById("sign-image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const learningMode = document.getElementById("learning-mode");
const quizMode = document.getElementById("quiz-mode");
const quizImageElement = document.getElementById("quiz-image");
const optionButtons = document.querySelectorAll(".option-btn");
const quizResult = document.getElementById("quiz-result");

// Function to update alphabet and image
function updateAlphabet() {
    alphabetElement.textContent = alphabets[currentIndex];
    signImageElement.src = `images/${alphabets[currentIndex]}.png`;
}

// Function to generate 5 random quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];

    // Select 5 unique random letters
    while (selectedQuestions.length < 5) {
        let letter = alphabets[Math.floor(Math.random() * alphabets.length)];
        if (!selectedQuestions.includes(letter)) {
            selectedQuestions.push(letter);
        }
    }

    quizQuestions = selectedQuestions.map(letter => {
        let options = [letter];
        
        // Add 3 additional incorrect options
        while (options.length < 4) {
            let randomOption = alphabets[Math.floor(Math.random() * alphabets.length)];
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            letter: letter,
            image: `images/${letter}.png`,
            options: options
        };
    });

    console.log("Quiz questions generated:", quizQuestions);  // Debugging
}

// Function to load quiz question
function loadQuizQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        alert("Quiz completed! Redirecting to levels page...");
        window.location.href = "levels.html";  // Redirect to levels page
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
    let correctLetter = quizQuestions[currentQuestionIndex].letter;
    if (button.textContent === correctLetter) {
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
        updateAlphabet();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < alphabets.length - 1) {
        currentIndex++;
        updateAlphabet();
    } else {
        // Start quiz after last alphabet
        generateQuizQuestions();
        learningMode.style.display = "none";
        quizMode.style.display = "block";
        currentQuestionIndex = 0;
        loadQuizQuestion();
    }
});

// Keyboard event listener for navigation
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < alphabets.length - 1) {
                currentIndex++;
                updateAlphabet();
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
            updateAlphabet();
        }
    }
});

// Initial Load
updateAlphabet();
