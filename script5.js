const verbs = [
    { word: "Walk", video: "videos/walk.mp4" },
    { word: "Run", video: "videos/run.mp4" },
    { word: "Sleep", video: "videos/sleep.mp4" },
    { word: "Eat", video: "videos/eat.mp4" },
    { word: "Talk", video: "videos/talk.mp4" },
    { word: "Dance", video: "videos/dance.mp4" },
    { word: "Go", video: "videos/go.mp4" },
    { word: "Come", video: "videos/come.mp4" },
    { word: "Need", video: "videos/need.mp4" },
    { word: "Drink", video: "videos/drink.mp4" },
    { word: "Read", video: "videos/read.mp4" },
    { word: "Write", video: "videos/write.mp4" },
    { word: "Play", video: "videos/play.mp4" },
    { word: "Work", video: "videos/work.mp4" },
    { word: "Study", video: "videos/study.mp4" }
];

let currentIndex = 0;  // Start from the first verb
let quizQuestions = [];
let currentQuestionIndex = 0;

const wordElement = document.getElementById("word");
const signVideoElement = document.getElementById("sign-video");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const learningMode = document.getElementById("learning-mode");
const quizMode = document.getElementById("quiz-mode");
const quizVideoElement = document.getElementById("quiz-video");
const optionButtons = document.querySelectorAll(".option-btn");
const quizResult = document.getElementById("quiz-result");

// Function to update word and video
function updateWord() {
    wordElement.textContent = verbs[currentIndex].word;
    signVideoElement.src = verbs[currentIndex].video;
    signVideoElement.load();  // Reload the video
}

// Function to generate quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];
    while (selectedQuestions.length < 5) {  // 5 questions for the quiz
        let randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        if (!selectedQuestions.includes(randomVerb)) {
            selectedQuestions.push(randomVerb);
        }
    }

    quizQuestions = selectedQuestions.map(verb => {
        let options = [verb.word];
        while (options.length < 4) {
            let randomOption = verbs[Math.floor(Math.random() * verbs.length)].word;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            word: verb.word,
            video: verb.video,
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
        document.getElementById("word-display").style.display = "block"; // Show word display
        currentIndex = 0;
        updateWord();
        return;
    }

    document.getElementById("word-display").style.display = "none"; // Hide word display
    let question = quizQuestions[currentQuestionIndex];
    quizVideoElement.src = question.video;
    quizVideoElement.load();
    optionButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
    });
    quizResult.textContent = "";
}

// Function to check quiz answer
function checkAnswer(button) {
    let correctWord = quizQuestions[currentQuestionIndex].word;
    if (button.textContent === correctWord) {
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

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateWord();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < verbs.length - 1) {
        currentIndex++;
        updateWord();
    } else {
        generateQuizQuestions();
        learningMode.style.display = "none";
        quizMode.style.display = "block";
        document.getElementById("word-display").style.display = "none"; // Hide word display
        currentQuestionIndex = 0;
        loadQuizQuestion();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < verbs.length - 1) {
                currentIndex++;
                updateWord();
            } else {
                generateQuizQuestions();
                learningMode.style.display = "none";
                quizMode.style.display = "block";
                document.getElementById("word-display").style.display = "none"; // Hide word display
                currentQuestionIndex = 0;
                loadQuizQuestion();
            }
        }
    } else if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
            currentIndex--;
            updateWord();
        }
    }
});