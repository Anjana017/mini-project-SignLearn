const emotions = [
    { word: "Happy", video: "videos/happy.mp4" },
    { word: "Sad", video: "videos/sad.mp4" },
    { word: "Angry", video: "videos/angry.mp4" },
    { word: "Excited", video: "videos/excited.mp4" },
    { word: "Scared", video: "videos/scared.mp4" },
    { word: "Surprise", video: "videos/surprised.mp4" },
    { word: "Tired", video: "videos/tired.mp4" },
    { word: "Bored", video: "videos/bored.mp4" },
    { word: "Confused", video: "videos/confused.mp4" },
    { word: "Love", video: "videos/loved.mp4" },
    { word: "Nervous", video: "videos/nervous.mp4" },
    { word: "Proud", video: "videos/proud.mp4" },
    { word: "Jealous", video: "videos/jealous.mp4" },
    { word: "Curious", video: "videos/curious.mp4" },
];

let currentIndex = 0;  // Start from the first emotion
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
    wordElement.textContent = emotions[currentIndex].word;
    signVideoElement.src = emotions[currentIndex].video;
    signVideoElement.load();  // Reload the video
}

// Function to generate quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];
    while (selectedQuestions.length < 5) {  // 5 questions for the quiz
        let randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        if (!selectedQuestions.includes(randomEmotion)) {
            selectedQuestions.push(randomEmotion);
        }
    }

    quizQuestions = selectedQuestions.map(emotion => {
        let options = [emotion.word];
        while (options.length < 4) {
            let randomOption = emotions[Math.floor(Math.random() * emotions.length)].word;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            word: emotion.word,
            video: emotion.video,
            options: options
        };
    });
}

function loadQuizQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        alert("Quiz completed! Restarting...");
        currentQuestionIndex = 0;
        learningMode.style.display = "block";
        quizMode.style.display = "none";
        document.getElementById("word-display").style.display = "block"; // Show emotion display
        currentIndex = 0;
        updateWord();
        return;
    }

    document.getElementById("word-display").style.display = "none"; // Hide emotion display
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
    if (currentIndex < emotions.length - 1) {
        currentIndex++;
        updateWord();
    } else {
        generateQuizQuestions();
        learningMode.style.display = "none";
        quizMode.style.display = "block";
        document.getElementById("word-display").style.display = "none"; // Hide emotion display
        currentQuestionIndex = 0;
        loadQuizQuestion();
    }
});

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < emotions.length - 1) {
                currentIndex++;
                updateWord();
            } else {
                generateQuizQuestions();
                learningMode.style.display = "none";
                quizMode.style.display = "block";
                document.getElementById("word-display").style.display = "none"; // Hide emotion display
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