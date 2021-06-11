const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishList = document.querySelector(".js-finishList");


const TODOS_LS = "toDos";
const FINTODOS_LS = "finToDos";

let toDos = [];
let finToDos = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    /* filter 함수는 array의 모든 아이템을 통해 
       함수를 실행하고 true인 아이템만 가지고 새로운
       array를 만들고...
    */
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function deleteFinish(event){
    const btn = event.target;
    const li = btn.parentNode;
    finishList.removeChild(li);
    const cleanFinTodos = finToDos.filter(function(finToDos){
        return finToDos.id != parseInt(li.id);
    });
    finToDos = cleanFinTodos;
    saveFinish();
}


//toDo 목록을 저장하는 함수
function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveFinish(){
    // JSON.stringify는 자바스크립트 object를 sting으로 바꿔준다.
    localStorage.setItem(FINTODOS_LS, JSON.stringify(finToDos));
}

function moveToDo(event){
    deleteFinish(event);
    const btn = event.target;
    const li = btn.parentNode;
    const value = li.childNodes[0];
    const toDoValue = value.innerText;
    paintToDo(toDoValue);
}

function finishToDo(event){
    deleteToDo(event);
    const btn = event.target;
    const li = btn.parentNode;
    const value = li.childNodes[0];
    const finValue = value.innerText;
    paintFinToDo(finValue);
}

function paintFinToDo(text){

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const finId = finToDos.length +1;

    delBtn.innerText = '❌';
    delBtn.addEventListener("click", deleteFinish);
    finBtn.innerText = '⏪';
    finBtn.addEventListener("click", moveToDo);
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    
    li.id = finId;
    finishList.appendChild(li);
    const finObj = {
        text : text,
        // task array의 길이의 +1 0부터 시작함. 길이는
        id : finId
    };
    //tasks arry에 taskObj 항목들 추가함
    finToDos.push(finObj);
    saveFinish();

}

 // toDoInput에 입력되는 값이 Argument임.
function paintToDo(text){
    // createElement li라는 요소를 만든다.
    const li = document.createElement("li");
    // createElement button 이라는 요소를 만든다.
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    // createElement span 이라는 요소를 만든다.
    const span = document.createElement("span");
    // newId 번호 변수 생성
    const newId = toDos.length+1;

    delBtn.innerText = "❌";
    //delBtn 클릭시 deleteToDo 함수 실행한다.
    delBtn.addEventListener("click", deleteToDo);
    finBtn.innerText = "✔";
    finBtn.addEventListener("click",finishToDo);

    //함수의 Argument를 span에 입력한다.
    span.innerText = text;
    
    li.appendChild(span);
    //li 하위에 button 요소를 추가함
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    //li 하위에 span 요소를 추가함
    // list 에 id 번호 추가함    
    li.id = newId;

    //js-toDoList 클래스를 가지는 하위에 li를 추가함
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();

    //자바스크립트는 local storage에 문자열로 저장하려고 함
}

//
function handleSubmit(event){
   // event 발생시 새로고침 되는거 방지하는 기능
    event.preventDefault();
    // toDoInput에 입력되는 값
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    //toDoInput 값 입력 후 input 창 초기화
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        //parse : sting이 아닌 object로 호출(변환) 해올수 있게 하는 것
        const parsedToDos = JSON.parse(loadedToDos);
        //forEach : arry에 담겨있는 것들 각각한번씩 함수를 처리하는 기능
        parsedToDos.forEach(function(toDo){
           paintToDo(toDo.text);
        })
    }
}


function loadFinToDo(){
    const loadedFinToDo = localStorage.getItem(FINTODOS_LS);
    if(loadedFinToDo !== null){
        const parsedFinToDo = JSON.parse(loadedFinToDo); 
        parsedFinToDo.forEach(function(finToDo){
            paintFinToDo(finToDo.text);
        })
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
    loadFinToDo();
}

init();