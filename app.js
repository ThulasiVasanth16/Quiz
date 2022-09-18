const quizQuestions = document.getElementsByClassName("quiz-questions")[0];
const addQuestionBtn = document.getElementById("addQuestion");
const addFinishBtn = document.getElementById("addFinish");
const deleteQuizBtn = document.getElementById("deleteQuizBtn");
const retakeQuizBtn = document.getElementById("retakeQuizBtn");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
var correct_answers = [];
var user_answers = [];
var questionNum = 1;
var index = 0;
var idNum = 0;

//add question to Quiz Button
addQuestionBtn.addEventListener("click", function () {
    addQuestion();
});

//add last question & take quiz button
addFinishBtn.addEventListener("click", function () {
    addFinish();
});

//dlt Quiz btn
deleteQuizBtn.addEventListener("click", function () {
    deleteQuiz();
});


//checkmark btn correct answer green
function setBtnColorGreen(buttonNum) {
    for (let i = 1; i < 5; i++) {
        document.getElementById('btn' + i + '').style.backgroundColor = "whitesmoke";
        document.getElementById('btn' + i + '').style.color = "black";
    }
    document.getElementById(buttonNum).style.backgroundColor = "lightgreen";
    document.getElementById(buttonNum).style.color = "white";
}

//check quiz question is complete
function validateForm() {
    if ((btn1.style.backgroundColor == "lightgreen" || btn2.style.backgroundColor == "lightgreen" || btn3.style.backgroundColor == "lightgreen" || btn4.style.backgroundColor == "lightgreen") && (question.value != '' && answer1.value != '' && answer2.value != '' && answer3.value != '' && answer4.value != ''))
        return true;
    else
        return false;
}

//add question to the quiz
function addQuestion() {
    if (validateForm()) {
        var div = document.createElement("div");
        div.className = "question";
        div.innerHTML =
            '<h4 style="color: #000;">Question ' + questionNum + '</h4>' +
            '<br>' +
            '<p syle="border-bottom: 2px solid rgba(211, 211, 211, 0.5);padding-bottom: 10px 0;"></p>' +
            '<br>' +
            '<h4 style="font-weight:bold;">' + question.value + '</h4>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'a' + idNum + '" value' + answer1.value + '> ' + answer1.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'b' + idNum + '" value=' + answer2.value + '> ' + answer2.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'c' + idNum + '" value=' + answer3.value + '> ' + answer3.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'd' + idNum + '" value=' + answer4.value + '> ' + answer4.value + '';

        quizQuestions.appendChild(div);

        if (btn1.style.backgroundColor == "lightgreen")
            correct_answers.push(answer1.value);
        if (btn2.style.backgroundColor == "lightgreen")
            correct_answers.push(answer2.value);
        if (btn3.style.backgroundColor == "lightgreen")
            correct_answers.push(answer3.value);
        if (btn4.style.backgroundColor == "lightgreen")
            correct_answers.push(answer4.value);

        for (let i = 1; i < 5; i++) {
            document.getElementById('btn' + i + '').style.backgroundColor = "whitesmoke";
            document.getElementById('btn' + i + '').style.Color = "black";
        }

        for (let i = 1; i < 5; i++)
            document.getElementById('answer' + i + '').value = "";

        document.getElementById("question").value = "";
        questionNum++;
        idNum++;

        showSnackbarSuccess1();
    }
    else {
        showSnackbarWarning1();
    }
}


//Add last Question & take quiz Function
function addFinish() {
    if (validateForm()) {
        var div = document.createElement("div");
        div.className = "question";
        div.innerHTML =
            '<h4 style="color: #000;">Question ' + questionNum + '</h4>' +
            '<br>' +
            '<p style=border-bottom: 2px solid rgba(211, 211, 211, 0.5);padding-bottom: 10px 0;"></p>' +
            '<br>' +
            '<h4 style="font-weight:bold;">' + question.value + '</h4>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'a' + idNum + '" value=' + answer1.value + '> ' + answer1.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'b' + idNum + '" value=' + answer2.value + '> ' + answer2.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'c' + idNum + '" value=' + answer3.value + '> ' + answer3.value + '' +
            '<br>' +
            '<br>' +
            '<input class="radio" type="radio" name="q' + idNum + '" id="' + 'd' + idNum + '" value=' + answer4.value + '> ' + answer4.value + '' +
            '<br>' +
            '<br>' +
            '<button id="submitQuizBtn">Submit Quiz</button>';

        quizQuestions.appendChild(div);

        document.getElementById("submitQuizBtn").addEventListener("click", function () {
            submitQuiz();
        });

        if (btn1.style.backgroundColor == "lightgreen")
            correct_answers.push(answer1.value);
        if (btn2.style.backgroundColor == "lightgreen")
            correct_answers.push(answer2.value);
        if (btn3.style.backgroundColor == "lightgreen")
            correct_answers.push(answer3.value);
        if (btn4.style.backgroundColor == "lightgreen")
            correct_answers.push(answer4.value);

        for (let i = 1; i < 5; i++) {
            document.getElementById('btn' + i + '').style.backgroundColor = "whitesmoke";
            document.getElementById('btn' + i + '').style.color = "black";
        }

        for (let i = 1; i < 5; i++)
            document.getElementById('answer' + i + '').value = "";

        document.getElementById("question").value = "";
        questionNum++;
        idNum++;
        showSnackbarSuccess2();
        addQuestionBtn.disabled = true;
        addFinishBtn.disabled = true;

    }
    else {
        showSnackbarWarning1();
    }

}

// SUBMIT AND GRADE THE QUIZ
function submitQuiz() {
    var div = document.createElement('div');
    var retakeBtn = document.createElement("button");

    retakeBtn.innerHTML = 'Retake';
    retakeBtn.style.marginTop = '10px';
    retakeBtn.addEventListener('click', function () {
        retakeQuiz();
    });

    div.className = 'results';
    div.innerHTML = '<h4 id="result" style="color: #000;">Results</h4>' +
        '<br>' +
        '<p style="border-bottom: 2px solid rgba(211, 211, 211, 0.5);padding-bottom: 10px 0;"></p>' +
        '<br>';

    for (var i = 0; i < idNum; i++) {
        if (document.getElementById('a' + i).checked == true && document.getElementById('a' + i).value == correct_answers[i] || document.getElementById('b' + i).checked == true && document.getElementById('b' + i).value == correct_answers[i] || document.getElementById('c' + i).checked == true && document.getElementById('c' + i).value == correct_answers[i] || document.getElementById('d' + i).checked == true && document.getElementById('d' + i).value == correct_answers[i]) {
            var p = document.createElement('p');
            var num = i + 1;
            p.innerHTML = 'Question ' + num + ': Correct';
            div.appendChild(p);
        }
        else {
            var p = document.createElement('p');
            var num = i + 1;
            p.innerHTML = 'Question ' + num + ': Incorrect / Answer is ' + correct_answers[i] + '';
            div.appendChild(p);
        }
    }
    div.appendChild(retakeBtn);
    quizQuestions.appendChild(div);

    deleteQuizBtn.disabled = false;
    document.getElementById("submitQuizBtn").disabled = true;
}
//retake the quiz
function retakeQuiz() {
    var radio = document.getElementsByClassName("radio");
    for (var i = 0; i < radio.length; i++) {
        radio[i].checked = false;
    }
    document.getElementById("submitQuizBtn").disabled = false;
    var elements = document.getElementsByClassName('results');
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

//dlt the quiz
function deleteQuiz() {
    if (idNum != 0) {
        idNum = 0;
        questionNum = 1;
        quizQuestions.innerHTML = '';
        correct_answers = [];
        user_answers = [];
        addQuestionBtn.disabled = false;
        addFinishBtn.disabled = false;
        showSnackbarInfo();
    }
    else {
        showSnackbarWarning2();
    }
}

//success, warning, info msg
function showSnackbarSuccess1() {
    var x = document.getElementById("snackbarSuccess1");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function showSnackbarSuccess2() {
    var x = document.getElementById("snackbarSuccess2");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function showSnackbarWarning1() {
    var x = document.getElementById("snackbarWarning1");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function showSnackbarWarning2() {
    var x = document.getElementById("snackbarWarning2");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

function showSnackbarInfo() {
    var x = document.getElementById("snackbarInfo");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}