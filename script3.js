const phrases = [
    { phrase: "Hello", video: "videos/hello.mp4" },
    { phrase: "Goodbye", video: "videos/goodbye.mp4" },
    { phrase: "Good morning", video: "videos/good_morning.mp4" },
    { phrase: "Good afternoon", video: "videos/good_afternoon.mp4" },
    { phrase: "Good evening", video: "videos/good_evening.mp4" },
    { phrase: "Good night", video: "videos/good_night.mp4" },
    { phrase: "Please", video: "videos/please.mp4" },
    { phrase: "Thank you", video: "videos/thank_you.mp4" },
    { phrase: "You're welcome", video: "videos/youre_welcome.mp4" },
    { phrase: "Excuse me / Sorry", video: "videos/excuse_me_sorry.mp4" },
    { phrase: "Nice to meet you", video: "videos/nice_to_meet_you.mp4" },
    { phrase: "My name is...", video: "videos/my_name_is.mp4" },
    { phrase: "What’s your name?", video: "videos/whats_your_name.mp4" },
    { phrase: "I don’t understand", video: "videos/i_dont_understand.mp4" },
    { phrase: "Can you sign that again?", video: "videos/can_you_sign_that_again.mp4" },
    { phrase: "Yes", video: "videos/yes.mp4" },
    { phrase: "No", video: "videos/no.mp4" },
    { phrase: "Maybe", video: "videos/maybe.mp4" },
    { phrase: "How are you?", video: "videos/how_are_you.mp4" },
    { phrase: "I’m fine / I’m good", video: "videos/im_fine.mp4" },
    { phrase: "See you later", video: "videos/see_you_later.mp4" },
    { phrase: "Take care", video: "videos/take_care.mp4" },
    { phrase: "What’s up?", video: "videos/whats_up.mp4" },
    { phrase: "How’s your day?", video: "videos/hows_your_day.mp4" }
];

let currentIndex = 0;  // Start from the first phrase
let quizQuestions = [];
let currentQuestionIndex = 0;

const phraseElement = document.getElementById("phrase");
const signVideoElement = document.getElementById("sign-video");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const learningMode = document.getElementById("learning-mode");
const quizMode = document.getElementById("quiz-mode");
const quizVideoElement = document.getElementById("quiz-video");
const optionButtons = document.querySelectorAll(".option-btn");
const quizResult = document.getElementById("quiz-result");

// Function to update phrase and video
function updatePhrase() {
    phraseElement.textContent = phrases[currentIndex].phrase;
    signVideoElement.src = phrases[currentIndex].video;
    signVideoElement.load();  // Reload the video
}

// Function to generate quiz questions
function generateQuizQuestions() {
    let selectedQuestions = [];
    while (selectedQuestions.length < 5) {  // 5 questions for the quiz
        let randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        if (!selectedQuestions.includes(randomPhrase)) {
            selectedQuestions.push(randomPhrase);
        }
    }

    quizQuestions = selectedQuestions.map(phrase => {
        let options = [phrase.phrase];
        while (options.length < 4) {
            let randomOption = phrases[Math.floor(Math.random() * phrases.length)].phrase;
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }

        // Shuffle options
        options.sort(() => Math.random() - 0.5);

        return {
            phrase: phrase.phrase,
            video: phrase.video,
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
        document.getElementById("word-display").style.display = "block"; // Show phrase display
        currentIndex = 0;
        updatePhrase();
        return;
    }

    document.getElementById("word-display").style.display = "none"; // Hide phrase display
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
    if (currentIndex < phrases.length - 1) {
        currentIndex++;
        updatePhrase();
    } else {
        generateQuizQuestions();
        learningMode.style.display = "none";
        quizMode.style.display = "block";
        document.getElementById("word-display").style.display = "none"; // Hide phrase display
        currentQuestionIndex = 0;
        loadQuizQuestion();
    }
});

// Function to check quiz answer
function checkAnswer(button) {
    let correctPhrase = quizQuestions[currentQuestionIndex].phrase;
    if (button.textContent === correctPhrase) {
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
        updatePhrase();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
        if (learningMode.style.display !== "none") {
            if (currentIndex < phrases.length - 1) {
                currentIndex++;
                updatePhrase();
            } else {
                generateQuizQuestions();
                learningMode.style.display = "none";
                quizMode.style.display = "block";
                document.getElementById("word-display").style.display = "none"; // Hide phrase display
                currentQuestionIndex = 0;
                loadQuizQuestion();
            }
        }
    } else if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
            currentIndex--;
            updatePhrase();
        }
    }
});