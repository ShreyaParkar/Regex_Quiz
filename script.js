const questions = [
    {   
        numb: 1,
        prompt: "Validate if time is in 24-hour format (HH:MM)",
        regex: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
        answer: "HH:MM" 
    },
    {   
        numb: 2,
        prompt: "Find all URLs in the given text",
        regex: /https?:\/\/\S+/,
        answer: "http://example.com" 
    },
    {
        numb: 3,
        prompt: "Find all hexadecimal color codes in the given text",
        regex: /#[0-9A-Fa-f]{6}\b/,
        answer: "#FFFFFF" 
    },
    {
        numb: 4,
        prompt: "Find all words starting with vowels",
        regex: /\b[aeiouAEIOU][a-zA-Z]*\b/,
        answer: "apple" 
    },
    {
        numb: 5,
        prompt: "Validate an India mobile number",
        regex: /^(\+91[\-\s]?)?[0]?[789]\d{9}$/,
        answer: "+91 9876543210" 
    },
    {
        numb: 6,
        prompt: "Validate a credit card number",
        regex: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|2131|1800|35[0-9]{14})$/,
        answer: "4111111111111111" 
    },
    {
        numb: 7,
        prompt: "Find all emails in the given text",
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        answer: "example@example.com" 
    },
    {
        numb: 8,
        prompt: "Match a string that contains exactly three consecutive digits",
        regex: /\b\d{3}\b/,
        answer: "123" 
    },
    {
        numb: 9,
        prompt: "Find all words in a text that are exactly 4 letters long",
        regex: /\b[a-zA-Z]{4}\b/,
        answer: "word" 
    },
    {
        numb: 10,
        prompt: "Match a string that starts and ends with the same character",
        regex: /^(.)\1*$/,
        answer: "racecar" 
    },
    {
        numb: 11,
        prompt: "Find all words in a text that contain at least one repeated letter",
        regex: /\b\w*(\w)\w*\1\w*\b/,
        answer: "letter" 
    }
];

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
const next_btn = document.querySelector("footer .nxt_btn"); // Ensure class name is consistent
const bottom_ques_counter = document.querySelector("footer .total_que");

let userAnswers = [];

start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); 
};


exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
};

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
};

restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    userAnswers = []; 
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
};

quit_quiz.onclick = () => {
    window.location.reload();
};

next_btn.onclick = () => {
    const answerInput = document.querySelector("#user_answer").value;
    userAnswers.push(answerInput); 

    if (que_count < questions.length - 1) { 
        que_count++; 
        que_numb++; 
        showQuestions(que_count); 
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    } else {
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
};

// Showing questions and input box for answers
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");

    // Creating a new span and input tag for question and answer input
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].prompt + '</span>';
    let answer_input = '<input type="text" id="user_answer" class="option_input" placeholder="Enter your answer here">';
    
    que_text.innerHTML = que_tag; // Adding new span tag inside que_text
    document.querySelector(".option_list").innerHTML = answer_input; // Adding input field
}

// Validate all answers after quiz ends
function validateAllAnswers() {
    userScore = 0; 
    userAnswers.forEach((answer, index) => {
        const regex = questions[index].regex;
        if (regex.test(answer)) { 
            userScore += 1; 
        }
    });
}

function showResult() {
    validateAllAnswers(); 

    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { 
        let scoreTag = '<span>and congrats! , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag; 
    } else if (userScore > 1) { 
        let scoreTag = '<span>and nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { 
        let scoreTag = '<span>and sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; 
        time--; 
        if (time < 9) { 
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; 
        }
        if (time < 0) { 
            clearInterval(counter); 
            timeText.textContent = "Time Off"; 
            document.querySelector(".option_input").setAttribute("disabled", true); 
            next_btn.classList.add("show"); 
            next_btn.onclick(); 
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions<span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;
}
