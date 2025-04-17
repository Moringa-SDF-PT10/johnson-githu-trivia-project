document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const questionCounter = document.getElementById('question-counter');
    const scoreDisplay = document.getElementById('score-display');
    const finalScore = document.getElementById('final-score');
    const feedbackMessage = document.getElementById('feedback-message');
  
    // Quiz data
    const questions = [
      {
        text: "Who was among those killed in the 2010 Smolensk, Russia plane crash tragedy?",
        options: ["Pope John Paul II","Bang-Ding Ow","Albert Putin", "The Polish President"],
        correctAnswer: 3
      },
      {
        text: "The key of sharps does the key of G# minor contain?",
        options: ["3","5","7","0"],
        correctAnswer: 1
      },
      {
        text: "Which is the protagonist of Bioshock Infinite?",
        options: ["Zachary Comstock","Booker DeWitt","Arthas Menethil","Herbie Hancock"],
        correctAnswer: 1
      },
      {
        text: "Final Fantasy VI was originally released outside Japan under what name?",
        options: ["Final Fantasy VI","Final Fantasy V","Final Fantasy III","Final Fantasy II"],
        correctAnswer: 2
      },
      {
        text: "What is the name of the inspector in the series 'On the Buses'?",
        options: ["Harper","Naily","Gally","Blakey"],
        correctAnswer: 3
      },
      {
        text: "The book 'Fahrenheit 451' was written by whom?",
        options: ["R. L. Stine","Wolfgang Amadeus Mozart","Stephen King","Ray Bradbury"],
        correctAnswer: 3
      },
      {
        text: "Which of these operators from 'Tom Clancy s Rainbow Six Siege' has the ability to damage reinforced walls?",
        options: ["Jordan 'Thermite' Trace","Eliza 'Ash' Cohen","Seamus 'Sledge' Cowden","Dominic 'Bandit' Brunsmeier"],
        correctAnswer: 0
      },
      {
        text: "In the Greek Mythology, the god of war is called?",
        options: ["Mars","Ares","Apollo","Hermes"],
        correctAnswer: 1
      },
      {
        text: "Who is the queen of the gods in Greek mythology?",
        options: ["Athena","Artemis","Hera","Demeter"],
        correctAnswer: 2
      },
      {
        text: "Who is the Greek god of the sea?",
        options: ["Hades","Zeus","Hephaestus","Poseidon"],
        correctAnswer: 3
      }
    ];
  
    // Game state
    let currentQuestionIndex = 0;
    let score = 0;
    let canSelect = true;
  
    // Event listeners
    startBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', resetGame);
  
    function startGame() {
      startScreen.classList.add('hidden');
      quizScreen.classList.remove('hidden');
      resetGame();
    }
  
    function resetGame() {
      resultScreen.classList.add('hidden');
      quizScreen.classList.remove('hidden');
      currentQuestionIndex = 0;
      score = 0;
      canSelect = true;
      updateScoreDisplay();
      showQuestion();
    }
  
    function showQuestion() {
      const question = questions[currentQuestionIndex];
      questionText.textContent = question.text;
      questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
      
      // Clear previous options
      optionsContainer.innerHTML = '';
      
      // Create new option buttons
      question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
      });
    }
  
    function selectOption(optionIndex) {
      if (!canSelect) return;
      
      canSelect = false;
      const currentQuestion = questions[currentQuestionIndex];
      const options = document.querySelectorAll('.option');
      
      // Show feedback
      options.forEach(option => option.classList.add('disabled'));
      
      if (optionIndex === currentQuestion.correctAnswer) {
        options[optionIndex].classList.add('correct');
        score++;
        updateScoreDisplay();
      } else {
        options[optionIndex].classList.add('incorrect');
        options[currentQuestion.correctAnswer].classList.add('correct');
      }
      
      // Move to next question after a short delay
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          canSelect = true;
          showQuestion();
        } else {
          showResult();
        }
      }, 1000);
    }
  
    function updateScoreDisplay() {
      scoreDisplay.textContent = `Score: ${score}`;
    }
  
    function showResult() {
      quizScreen.classList.add('hidden');
      resultScreen.classList.remove('hidden');
      
      finalScore.textContent = `Your final score: ${score} out of ${questions.length}`;
      
      if (score === questions.length) {
        feedbackMessage.textContent = 'Perfect score! You\'re amazing!';
        feedbackMessage.className = 'green-text';
      } else if (score >= questions.length / 2) {
        feedbackMessage.textContent = 'Good job! You know your stuff!';
        feedbackMessage.className = 'orange-text';
      } else {
        feedbackMessage.textContent = 'Nice try! Keep learning!';
        feedbackMessage.className = 'red-text';
      }
    }
  });