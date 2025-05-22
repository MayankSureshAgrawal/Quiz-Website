document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const options = [
        document.getElementById('option1'),
        document.getElementById('option2'),
        document.getElementById('option3'),
        document.getElementById('option4')
    ];
    const submitButton = document.getElementById('nextque');
    const timerElement = document.getElementById('timer');
    let currentQuestionIndex = 0;
    let questions = [];
    let selectedAnswer = null;
    let score = 0; // Track the score
    let timer = 15;
    let timerInterval;

    // Retrieve the API link from localStorage
    const apiLink = localStorage.getItem('apiLink');

    // Fetch quiz questions from API
    fetch(apiLink) // Use the apiLink from localStorage
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            questions = data.results.map(q => ({
                ...q,
                question: decodeHtml(q.question) // Decode HTML entities
            }));
            displayQuestion();
            startTimer();
        })
        .catch(error => console.error('Error fetching questions:', error));

    // Function to decode HTML entities
    function decodeHtml(html) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = html; // Convert HTML entities to plain text
        return textArea.value; // Return decoded value
    }

    // Display the current question and options
    function displayQuestion() {
        resetStyles();
        const question = questions[currentQuestionIndex];
        const shuffledOptions = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5);

        questionElement.textContent = question.question;

        options.forEach((option, index) => {
            option.textContent = decodeHtml(shuffledOptions[index]); // Decode options
            option.disabled = false;
            option.onclick = function () {
                selectAnswer(option, shuffledOptions[index] === question.correct_answer);
            };
        });
    }

    // Handle option button clicks
    function selectAnswer(selectedOption, isCorrect) {
        selectedAnswer = selectedOption;
        resetStyles();

        if (isCorrect) {
            selectedOption.classList.add('correct'); // Turn the selected option green if correct
            score++; // Increment score
        } else {
            selectedOption.classList.add('incorrect'); // Turn the selected option red if incorrect
            // Find and highlight the correct answer
            options.forEach(option => {
                if (option.textContent === questions[currentQuestionIndex].correct_answer) {
                    option.classList.add('correct'); // Highlight the correct answer in green
                }
            });
        }

        options.forEach(option => option.disabled = true); // Disable all options after selection
    }

    // Reset button styles
    function resetStyles() {
        options.forEach(option => {
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });
    }

    // Submit quiz and move to the next question
    submitButton.addEventListener('click', function () {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            resetTimer();
        } else {
            // Store the score in localStorage
            localStorage.setItem('quizScore', score);

            // Redirect to category.html after the quiz
            window.location.href = 'index.html'; // Redirect to category page
        }
    });

    // Timer countdown
    function startTimer() {
        timerInterval = setInterval(() => {
            timer--;
            timerElement.textContent = `${timer}`;
            if (timer === 0) {
                alert('Time is up! Moving to the next question.');
                submitButton.click(); // Automatically move to the next question
            }
        }, 1000);
    }

    // Reset the timer for the next question
    function resetTimer() {
        timer = 15;
        timerElement.textContent = `${timer}`;
    }
});
