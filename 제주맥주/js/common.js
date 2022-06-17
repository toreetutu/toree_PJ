// 제주맥주 PJ 공통 JS ///////////////////

/*************************************************** 
  함수명: showGNB
  기능 : GNB메뉴(서브페이지)를 보였다 숨기기 위해
  미리 세팅된 클래스 on을 .top에 넣고/뺌 
 **************************************************/
function showGNB() {
  // 1.함수호출 확인
  console.log('나야나');

  // 2.변경대상: .top (상단영역)
  var tg = document.querySelector(".top");

  // 3.클래스 on 넣기
  // 클래스리스트 객체 안에 add메소드를 만들어놓고 on을 집어넣게 함
  tg.classList.toggle("on");
  /* 
    [ 클래스 넣기/빼기 객체 ]
    classList
    1. add(클래스명) -> 클래스넣기
    2. remove(클래스명) -> 클래스빼기
    3. toggle(클래스명) -> 존재여부로 클래스변경(있음빼고 없음넣고)
  */

} ////////////////// showGNB 함수///////////////////
////////////////////////////////////////////////////


// 스크롤 위치값 변수 (계속 변해야하니까 let)
let scTop;
// 위로가기버튼 대상: .tbtn
let tbtn;

/////////// 로드구역 /////////////////
window.addEventListener("DOMContentLoaded", () => {

  // 부드러운 스크롤 호출
  startSS();

  // 위로가기버튼 대상선정: .tbtn
  tbtn = document.querySelector(".tbtn")

  // 위로가기버튼 클릭시 => 제이쿼리로 부드러운 이동 
  $('.tbtn').click(()=>{
    // 제이쿼리 스크롤 애니메이션
    // animate({css속성변경},시간)
    $('html,body').animation({
      scrollTop: "0"
    }, 300); ///// animate /////

    // 부드러운 스크롤 위치값 어데이트
    pos = 0;
  }); ////////// click /////////

}); //////////// 로드구역 ////////////

/********************************************* 
  [ 윈도우 스크롤 이벤트 함수 ]

  - 스크롤 이벤트: scroll
  - 이벤트대상: window
  - 스크롤 이벤트값: scrollY
*********************************************/
window.addEventListener('scroll', () => {
  // 스크롤 위치표시
  scTop = this.scrollY;
  console.log("스크롤위치:", scTop);
  // scrollY - 세로축 스크롤위치값 리턴
  // this는 화살표함수에서 window객체임
  console.log("this의미:", this);

  // [ 여러방법의 스크롤위치값 알아오기 ]
  /* 
  console.log("스크롤위치2:",document.scrollingElement.scrollTop);
  console.log("스크롤위치3:",document.documentElement.scrollTop);
  console.log("스크롤위치4:",document.querySelector("html").scrollTop); 
  */

  ////////////////////////////////////
  ///// 위로가기버튼 보이기 ////////
  ////////////////////////////////////

  // 1. 스크롤위치가 300px이상일때
  // 변경사항: .tbtn에 클래스 "on"넣기
  // 함수가 하나라서 중괄호 제거가능
  if (scTop >= 300)
    tbtn.classList.add("on");
  // 300px미만일경우 클래스"on"제거 
  else
    tbtn.classList.remove("on");

}); /////////////////// scroll ///////////////
//////////////////////////////////////////////


/************************************************** 
      [윈도우 세로 스크롤 위치값 가져오는 방법]

      1. this.scrollY (this키워드가 window의미)
      2. window.scrollY
      3. document.scrollingElement.scrollTop
      4. document.documentElement.scrollTop
      5. document.querySelector("html").scrollTop

      참고) 가로스크롤일 경우
          scrollY -> scrollX
          scrollTop -> scrollLeft
          로 바꿔서 위와 동일함!

  **************************************************/