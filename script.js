// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Personality Test Questions
const quizQuestions = [
  {
    question: "You prefer to spend your free time:",
    answers: [
      { text: "Reading a book", type: "Introvert" },
      { text: "Going to a party", type: "Extrovert" },
      { text: "Learning a new skill", type: "Analytical" },
      { text: "Exploring outdoors", type: "Adventurous" }
    ]
  },
  {
    question: "When working on a project, you usually:",
    answers: [
      { text: "Plan everything in detail", type: "Analytical" },
      { text: "Go with the flow", type: "Creative" },
      { text: "Take the lead", type: "Extrovert" },
      { text: "Work quietly on your part", type: "Introvert" }
    ]
  },
  {
    question: "Which environment makes you most comfortable?",
    answers: [
      { text: "Quiet and calm places", type: "Introvert" },
      { text: "Crowded and energetic spaces", type: "Extrovert" },
      { text: "Nature and outdoors", type: "Adventurous" },
      { text: "Creative studios / labs", type: "Creative" }
    ]
  },
  {
    question: "How do you usually make decisions?",
    answers: [
      { text: "Carefully after analysis", type: "Analytical" },
      { text: "Spontaneously", type: "Adventurous" },
      { text: "Based on gut feeling", type: "Creative" },
      { text: "After asking others", type: "Extrovert" }
    ]
  },
  {
    question: "Your friends describe you as:",
    answers: [
      { text: "Thoughtful and reserved", type: "Introvert" },
      { text: "Energetic and social", type: "Extrovert" },
      { text: "Curious and logical", type: "Analytical" },
      { text: "Imaginative and playful", type: "Creative" }
    ]
  },
  {
    question: "Which activity sounds the most fun to you?",
    answers: [
      { text: "Camping or hiking", type: "Adventurous" },
      { text: "Hosting a party", type: "Extrovert" },
      { text: "Painting, writing, or music", type: "Creative" },
      { text: "Solving puzzles or riddles", type: "Analytical" }
    ]
  },
  {
    question: "When faced with a problem, you:",
    answers: [
      { text: "Analyze all possibilities", type: "Analytical" },
      { text: "Trust your intuition", type: "Creative" },
      { text: "Discuss with others", type: "Extrovert" },
      { text: "Work alone quietly", type: "Introvert" }
    ]
  },
  {
    question: "Your ideal vacation would be:",
    answers: [
      { text: "Relaxing with a book at the beach", type: "Introvert" },
      { text: "Exploring a new city with friends", type: "Extrovert" },
      { text: "Hiking or extreme sports", type: "Adventurous" },
      { text: "Visiting museums and cultural sites", type: "Analytical" }
    ]
  },
  {
    question: "Which of these do you value the most?",
    answers: [
      { text: "Freedom and excitement", type: "Adventurous" },
      { text: "Harmony and friendships", type: "Extrovert" },
      { text: "Knowledge and truth", type: "Analytical" },
      { text: "Imagination and creativity", type: "Creative" }
    ]
  },
  {
    question: "If you had to choose a role in a team, you’d be:",
    answers: [
      { text: "The planner and organizer", type: "Analytical" },
      { text: "The motivator and leader", type: "Extrovert" },
      { text: "The quiet worker in the background", type: "Introvert" },
      { text: "The idea generator", type: "Creative" }
    ]
  }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let personalityScores = {
  Introvert: 0,
  Extrovert: 0,
  Creative: 0,
  Analytical: 0,
  Adventurous: 0
};
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;

// Event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  answersDisabled = false;

  // reset personality scores
  personalityScores = { Introvert: 0, Extrovert: 0, Creative: 0, Analytical: 0, Adventurous: 0 };

  startScreen.classList.remove("active");
  resultScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.type = answer.type;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedType = event.target.dataset.type;
  personalityScores[selectedType]++;

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 400);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  // find highest scoring personality
  let topPersonality = Object.keys(personalityScores).reduce((a, b) =>
    personalityScores[a] > personalityScores[b] ? a : b
  );

  resultMessage.textContent = `✨ Your Personality Type: ${topPersonality} ✨`;
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
