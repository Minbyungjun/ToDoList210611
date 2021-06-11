const form = document.querySelector(".js-form"),
    inputing = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");


const USER_LS = "currentUser",
    SHOWING_CN = "showing";

//localStorage에 입력값을 입력하기 위함
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
    // event 발생시 새로고침 되는거 방지하는 기능
    event.preventDefault();
    //inputing(form에 inpu) 값을 currentValue 변수에 저장
    const currentValue = inputing.value;
    //currentValue 값 표현
    paintGreeting(currentValue);
    saveName(currentValue);
}

/* localStorage에 값이 비어 있으면, 
form 양식이 보이도록 SHOWING_CN 변수의 값을 가지는
Class를 form에 추가하며, form의 event가 발생하면
handleSubmit 함수 실행)
 */

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

/*from Class 가 있는곳에 SHOWING_CN 변수의 
이름을 가진 클래스 삭제
greeting class가 있는 곳에 SHOWING_CN 변수의
이름을 가진 클래스 추가 
greeting Class 에 Hello와 Argument 값을 
넣어준다.*/
function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Have a good day ${text}`;
}

/* localStorage에 저장되어 있는 USER_LS 변수의
값을 가지는 값이 비어 있으면 askForName 함수 실행,
값이 있으면 paintGreeting 함수 실행
 */
 
function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //currentUser 값이 업을 때
        askForName();

    }else{
        //currentUser 값이 있을 때 

        paintGreeting(currentUser);
    }
}


/* loadName 함수 실행*/
function init(){
    loadName();
}

/* init 함수 실행*/
init();
