document.getElementById('startQuiz').addEventListener('click', function() {
    const numberOfQuestions = document.getElementById('questions').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;

    // You can log the selected options or use them to fetch questions from an API
    console.log(`Number of Questions: ${numberOfQuestions}`);
    console.log(`Category: ${category}`);
    console.log(`Difficulty Level: ${difficulty}`);

    const Lastscore = localStorage.getItem('score')
    
    // Redirect to quiz page or fetch questions using the selected options
    // For example:
    // window.location.href = `/quiz?questions=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
});

document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category');
    const difficultySelect = document.getElementById('difficulty');
    const startQuizButton = document.getElementById('startQuiz');

    let apiLink = '';

    // Function to update the API link based on selections
    function updateApiLink() {
        const category = categorySelect.value;
        const difficulty = difficultySelect.value;

        // Nested if-else conditions for category and difficulty
        if (category === 'sports') {
            if (difficulty === 'easy') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';
            } else if (difficulty === 'medium') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple';
            } else if (difficulty === 'hard') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple';
            }
        }
        if (category === 'general_knowledge') {
            if (difficulty === 'easy') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';
            } else if (difficulty === 'medium') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple';
            } else if (difficulty === 'hard') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple';
            }
        }
        if (category === 'science') {
            if (difficulty === 'easy') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple';
            } else if (difficulty === 'medium') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=multiple';
            } else if (difficulty === 'hard') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=17&difficulty=hard&type=multiple';
            }
        }
        if (category === 'animals') {
            if (difficulty === 'easy') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple';
            } else if (difficulty === 'medium') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple';
            } else if (difficulty === 'hard') {
                apiLink = 'https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple';
            }
        }

        localStorage.setItem('apiLink', apiLink); // Store the apiLink in localStorage

        console.log('API Link:', apiLink); // To verify the API link
    }

    // Event listeners to update the API link when category or difficulty changes
    categorySelect.addEventListener('change', updateApiLink);
    difficultySelect.addEventListener('change', updateApiLink);

    // Button to start the quiz and use the generated API link
    startQuizButton.addEventListener('click', function() {
        if (apiLink) {
            console.log('Starting quiz with API:', apiLink);
                window.location.href = 'quiz.html'; // Redirect to registration page

        } else {
            alert('Please select a category and difficulty level.');
        }
    });
});
