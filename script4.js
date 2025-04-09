const words = [
    { word: "Mother", video: "videos/mother.mp4" },
    { word: "Father", video: "videos/father.mp4" },
    { word: "Sister", video: "videos/sister.mp4" },
    { word: "Brother", video: "videos/brother.mp4" },
    { word: "Friend", video: "videos/friend.mp4" },
    { word: "Best Friend", video: "videos/best_friend.mp4" },
    { word: "Neighbor", video: "videos/neighbor.mp4" },
    { word: "Home", video: "videos/home.mp4" },
    { word: "School", video: "videos/school.mp4" },
    { word: "Park", video: "videos/park.mp4" },
    { word: "Store", video: "videos/store.mp4" },
    { word: "Red", video: "videos/red.mp4" },
    { word: "Blue", video: "videos/blue.mp4" },
    { word: "Green", video: "videos/green.mp4" },
    { word: "Yellow", video: "videos/yellow.mp4" }
];

let currentIndex = 0;  // Start from the first word
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
    wordElement.textContent = words[currentIndex].word;
    signVideoElement.src = words[currentIndex].video;
    signVideoElement.load();  // Reload the video
}

// Function to generate quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];
    while (selectedQuestions.length < 5) {  // 5 questions for the quiz
        let randomWord = words[Math.floor(Math.random() * words.length)];
        if (!selectedQuestions.includes(randomWord)) {
            selectedQuestions.push(randomWord);
        }
    }

    quizQuestions = selectedQuestions.map(word => {
        let options = [word.word];
        while (options.length < 4) {
            let randomOption = words[Math.floor(Math.random() * words.length)].word;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            word: word.word,
            video: word.video,
            options: options
        };
    });
}

// Function to load quiz question
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

// Update next button event listener
nextBtn.addEventListener("click", () => {
    if (currentIndex < words.length - 1) {
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

// Update keyboard event listener
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < words.length - 1) {
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