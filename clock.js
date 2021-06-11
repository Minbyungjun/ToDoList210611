//html 문서의 js-clock class 부분을 변수 지정 
const clockContainer = document.querySelector(".js-clock"),
//clockContainer 변수 하위의 h1 Tag 부분을 변수로 지정함
 clcokTitle = clockContainer.querySelector("h1");

 function getTodayLabel(){
     const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', ' Fri', 'Sat'];
     const date = new Date();
     const day = date.getDay();
     const todayLabel = week[day];

     return todayLabel;
 }
 

 //현재 시간을 얻는 함수 getTime 지정 
 function getTime(){
     const date = new Date();
     const minutes = date.getMinutes();
     const hours = date.getHours();
     const seconds = date.getSeconds();
     const today = getTodayLabel();
     // clockTitle 변수에 해당 시간, 분, 초 값을 넣어줌
     clcokTitle.innerHTML = `(${today}) ${hours < 10 ? `0${hours}`: hours}:${minutes < 10 ? 
        `0${minutes}`:minutes}`
        //:${seconds < 10 ? `0${seconds}`:seconds}`;
     
 }

function init(){
    getTime();
    //1초간격으로 getTime 함수를 불러오는 것
    setInterval(getTime, 1000);
}

init();