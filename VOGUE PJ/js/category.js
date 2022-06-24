// 보그 PJ 카테고리 페이지 JS - category.js

// 객체로 만들어진 데이터파일을 별도의 파일로 만든 것을
// 제이슨(JSON)이라고 한다
// 제이쿼리에서 제이슨파일을 불러와서 
// 변수에 할당하여 사용할 수 있다
// 제이슨 위치 : js/cat.json

// 제이쿼리 제이슨 가져오기 메서드
// $.getJSON(파일경로,함수)
// $.getJSON(파일경로,(변수)=>{})
// -> 함수의 변수는 제이슨파일의 데이터를 전달함 
// 제이슨 파일경로로 불러오고 
// 함수에서 내가 쓸 변수에 할당해준다

// 참고)자바스크립트는 제이슨을 쓰려면 js파일처럼 json도
// html페이지에서 <script src="제이슨파일"> 이런식으로 불러옴
// 코드에서 JSON.parse(변수) 제이슨 변환메서드를 사용해 코딩함


// 제이슨 객체데이터 할당변수
let sinfo;
// 제이슨 데이터 연결하여 할당하기
$.getJSON("js/cat.json",jdata=>sinfo=jdata);
// jdata는 아무이름이어도 상관없음
// 중요한 것은 getJSON() 메서드에서 
// 제이슨파일 내부의 데이터를 
// 하나의 변수에 담아 전달하고 있다는 점이다

//// 각 서브별 데이터 셋팅하기 /////
// const sinfo = ; ////////// sinfo ////////////////

// URL로 넘어온 파라미터 전달값 받기 ///
// GET방식으로 넘어온 (키=값) 쌍을 받는다!
// 변수 = location.href -> url값을 읽어옴!
let pm = location.href;
// 현재 파라미터값만 필요하므로
// 물음표(?)로 잘라서 뒤의 것 -> [1]
// 이퀄(=)로 잘라서 뒤의 것 -> [1]
pm = pm.split('?')[1].split('=')[1];
pm = decodeURIComponent(pm);
console.log(decodeURIComponent(pm));
// 특수문자가 있으므로 (time & gem) 이것을 보낼때
// encodeURIComponent()로 변환하여 보내고 
// 받는 곳에서는 decodeURIComponent()로 복원함

$(()=>{ //////////// 로드구역 ///////////////

  // 1. 해당카테고리의 데이터 셋업
  const data = sinfo[pm];
  console.log(data);

  // 2. 데이터 페이지 바인딩하기
  // (1) 타이틀넣기
  $('.stit').text(data['제목']);

  // (2) .cont에 카테고리 클래스넣기(배경이미지 나옴)
  // -> "경로" 데이터로 클래스명을 줘야함
  // 대상: .cont
  $(".cont").addClass(data['경로']);

  // (3) LNB메뉴 세팅하기
  // "메뉴" 데이터로 값이 "없음"이 아닐경우 
  // 메뉴 갯수만큼 ul>li>a의 구조로 메뉴를 구성함
  let menu = data['메뉴'];
  console.log("메뉴:",menu);
  // 대상 : .lnb
  let lnb = $(".lnb");
  // 임시코드변수(ul>li>a담을변수)
  let hcode = "";
  // 분기: 조건 - 데이터가 "없음"인가?
  if(menu==="없음") lnb.remove();
  else{ // 메뉴만들기
    hcode += "<ul>";

    // 메뉴배열만큼 코드만들기
    menu.forEach(val => {
      hcode += "<li>";
      hcode += `<a href="#">${val}</a>`;
      hcode += "</li>";
    }); /////// forEach //////////

    hcode += "</ul>";

    // 코드넣기
    lnb.html(hcode)

  } ////// else ////////////

  // (4) 각 컨텐츠박스 타이틀넣기
  // 대상: .cbx h2
  // 데이터: "타이틀"의 배열
  // each((순번,요소자신)=>{})
  $(".cbx h2").each(
    (idx,ele)=>$(ele).html(data['타이틀'][idx]));
    // data['타이틀'][배열순번]
    // 배열순번 === h2요소순번 === idx


  // (5) 타이틀 변경하기
  // 대상: title 태그
  // 데이터: "제목" 값
  $("title").prepend(data['제목']);
  // prepend() : 앞에 데이터추가(기존데이터 살아있음!)
  // 참고) append(): 뒤에 데이터추가(기존데이터 살아있음!)

}); //////////////// jQB ////////////////////