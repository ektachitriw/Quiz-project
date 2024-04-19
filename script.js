const quizData = [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris"
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      question: "Which is the nearest planet to sun?",
      options: ["Jupiter", "Saturn", "mercury", "Earth"],
      answer: "mercury"
    },
    {
      question: "What is the currency of japan?",
      options: ["yen", "rupee", "dollar", " reticulum"],
      answer: "yen"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Tokyo", "Beijing", "canberra", "Osaka"],
      answer: "canberra"
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 300; // 5 minutes in seconds

  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const resultText = document.getElementById('result');
  const scoreValue = document.getElementById('score-value');
  const timerValue = document.getElementById('timer-value');

  // Update the timer every second
  const timerInterval = setInterval(updateTimer, 1000);

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    timerValue.textContent = `${minutes}:${seconds}`;
    if (timeLeft === 0) {
      endQuiz();
      clearInterval(timerInterval);
    } else {
      timeLeft--;
    }
  }

  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionText.innerText = currentQuizData.question;
    optionsContainer.innerHTML = "";
    currentQuizData.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('option-btn');
      button.addEventListener('click', () => selectAnswer(option));
      optionsContainer.appendChild(button);
    });
  }

  function selectAnswer(selectedOption) {
    const currentQuizData = quizData[currentQuestion];
    if (selectedOption === currentQuizData.answer) {
      score++;
      optionsContainer.childNodes.forEach(button => {
        if (button.innerText === currentQuizData.answer) {
          button.classList.add('correct');
        }
      });
    } else {
      optionsContainer.childNodes.forEach(button => {
        if (button.innerText === selectedOption) {
          button.classList.add('incorrect');
        }
        if (button.innerText === currentQuizData.answer) {
          button.classList.add('correct');
        }
      });
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      endQuiz();
    }
  }

  function endQuiz() {
    questionText.innerText = "Quiz completed!";
    optionsContainer.innerHTML = "";
    resultText.innerText = "Your final score is " + score + " out of " + quizData.length;
    scoreValue.innerText = score;
    clearInterval(timerInterval);
  }

  loadQuestion()
