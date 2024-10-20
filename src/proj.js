//! --------------------------------------------------------------------------------------------css dont forgit the medaiiiiiiiiiiii@


// todo/   const APIURL = "https://opentdb.com/api.php?amount=50"



const question = document.getElementById("question");
const js_option = document.querySelector(".js_option");

const js_correctScore = document.getElementById("js-cerrent-score")
const js_totelquestion = document.getElementById("totelquestion")
const checkbtn = document.getElementById("cheak-answer")
const play_agine = document.getElementById("play-agien")
js_resolt = document.getElementById("js_resolt")




//? let js_correct_answer = " ", correctscore = askedcount = 0, totelquison = 10;
// !OR
let correctAnswer = "";
let correctScore = 0;
let askedCount = 0;
let totalQuestions = 10;



function eventListener() {
    checkbtn.addEventListener("click", checkAnswer)
}
document.addEventListener("DOMContentLoaded", () => {
    loadingQustion()
    eventListener()
    js_totelquestion.textContent = totalQuestions;
    js_correctScore.textContent = correctScore;
})




async function loadingQustion() {
    const APIURL = "https://opentdb.com/api.php?amount=1";
    const respon = await fetch(`${APIURL}`)
    js_resolt.innerHTML = " "
    const data = await respon.json();
    showQustion(data.results[0]);
}


function showQustion(dataa) {
    checkbtn.disabled = false
    correctAnswer = dataa.correct_answer;
    let incorrect_answers = dataa.incorrect_answers;
    let type_quiz = dataa.type
    let optionlist = incorrect_answers;
    optionlist.splice(Math.floor(Math.random() * (incorrect_answers.length + 1)), 0, correctAnswer)//! this add the correct_answer in random way by use the properties of the ((((( splice)))))

    question.innerHTML = `<h2 class="js_quiz-qustion" id="question">${dataa.question}<span class=" js_catorege">${dataa.category}</span></h2>`

    js_option.innerHTML = `${optionlist.map((option, indii) => `
        <li><span>${option}</span</li>
        `).join("")}`;


    console.log(dataa);
    console.log(correctAnswer);
    // console.log(incorrect_answers);
    // console.log(type_quiz);
    console.log(optionlist);


    selectQution()
}


function selectQution() {
    js_option.querySelectorAll("li").forEach((thing) => {
        thing.addEventListener("click", () => {

            if (thing.style.color == "black") {
                thing.style.backgroundColor = "#8854c0"
                thing.style.color = "#ffffff"
                console.log("ghhhhhhh")
                thing.classList.remove("imporThing")
            }

            else {
                thing.style.backgroundColor = "#efefef";
                thing.style.color = "black"
                console.log("hi")
                thing.classList.add("imporThing")
            }
        })
    })
}
// let TIP = js_option.style.color = "black"
function checkAnswer() {
    checkbtn.disabled = true
    if (js_option.querySelector(".imporThing")) {
        let selectanswer = js_option.querySelector(".imporThing").textContent.trim()
        console.log(selectanswer)
        if (selectanswer === htmlconvert(correctAnswer)) {
            correctScore++;
            js_resolt.innerHTML = `<i class="simple-line-icons--check"></i><p> correct answer!</p>`
        } else {
            js_resolt.innerHTML = `<i class="charm--circle-cross"></i><p>incorrect answer<br> <small><b>correct answer is: </b></small> ${correctAnswer}</p></br>`
        }
        cheakcount()
    } else {
        js_resolt.innerHTML = `<p>Please select an answer!</p>`;
        checkbtn.disabled = false
    }
}


function htmlconvert(text) {
    let doc = new DOMParser().parseFromString(text, "text/html")
    return doc.documentElement.textContent
}


function cheakcount() {
    askedCount++;
    setCount();
    if (askedCount == totalQuestions) {
        js_resolt.innerHTML += `<p class="booom"> your score is: ${correctScore} </p>`
        play_agine.style.display = "block"

    } else {
        setTimeout(() => {
            loadingQustion()
        }, 3000)
    }
}

function setCount() {
    js_totelquestion.textContent = totalQuestions
    js_correctScore.textContent = correctScore
}

function give_up() {
    window.Location.href = "chrome://newtab/"
}
