// 보그 JS 카데고리 페이지 JS - category.js

// 객체로 만들어지 데이터파일을 별도의 파일로 만든것을
// 제이슨(JSON)이라고 한다!
// 제이쿼리에서 제이슨 파일을 불러와서 변수에
// 할당하여 사용할 수 있다!!!
// 제이슨 위치: js/cat.json

// 제이쿼리 제이슨 가져오기 매서드
// $.getJSON(파일경로,함수)
// $.getJSON(파일경로,(변수)=>{})
// -> 함수의 변수는 제이슨파일의 데이터를 전달함!
// 제이슨 파일경로로 불로오고 함수에서 내가쓸 변수에
// 할당한다!

// 참고) 자바스크립트는 제이슨을 쓰려면 js파일처럼 json도
// html페이지에서 <script src="제이슨파일"> 이런식으로 불러옴
// 코드에서 JSON.parse(변수) 제이슨 변환메서드를 사용해 코딩함!

// 제이슨 객체데이터 할당변수
let sinfo;
// 제이슨 데이터 연결하여 할당하기!
$.getJSON('js/cat.json', jdata => sinfo = jdata);
// jdata는 아무이름이어도 상관없다!
// 중요한 것은 getJSON() 메서드에서 제이슨파일 내부의
// 데이터를 하나의 변수에 담아 전달하고 있다는 점이다!!!

///// 각 서브별 데이터 셋팅하기 /////

// URL로 넘어온 파라미터 전달값 받기 ///
// GET방식으로 넘어온 (키=값) 쌍을 받는다!
// 변수 = location.href -> url값을 읽어옴!
let pm = location.href;
// 현재 파라미터값만 필요하므로
// 물음표(?)로 잘라서 뒤엣것 -> [1]
// 이퀄(=)로 잘라서 뒤엣것 -> [1]
pm = pm.split('?')[1].split('=')[1];
pm = decodeURIComponent(pm);
console.log(pm);
// 특수문자가 있으므로 (time & gem) 이것을 보낼때
// encodeURIComponent()로 변환하여 보내고 
// 받는 곳에서는 decodeURIComponent()로 복원함


//////////// 로딩구역 /////////////////////
window.addEventListener("DOMContentLoaded", () => {

    console.log("로딩완료");


    //// 데이터 바인딩 Vue 인스턴스 생성하기 ///
    let db = new Vue({
        el: "#cont", // 바인딩할 대상(변경요소를 포함하는 부모요소) 
                    // -> 아이디만 유일하기 때문에 적용됨, 클래스는 여러개 잡을 수 있으므로 적용불가
        data: {
            vals: {},
            // json 데이터가 객체임!
            catName : pm.replace(' & ','-')
            // 파라미터로 넘어온 값을 Vue 데이터변수에 넣기
        }, //// data ///////
        mounted: function () {
            axios // 엑시오스 객체
            .get("js/cat.json") // 파일읽기
            .then(x => this.vals = x); // 할당(x변수로 전달!)
        }, ////// mounted //////
        methods: {
            // 탭 타이틀 변경 메서드
            chgTit: function (tit) { // tit - 제목전달
                // document.querySelector("title").innerText = 
                // tit+" | 보그 코리아 (Vogue Korea)"; 
                $("title").text(tit+" | 보그 코리아 (Vogue Korea)");
                // 제이쿼리로 해도 가능함

            } //////chgTit 메서드 /////////
        } ///////// methods ////////////
    
    }); ////////////// Vue //////////////

    ////////// 뷰JS 체험존 GNB 메뉴 클릭시 세팅 //////
    $(".VueGnb a").click(function(e){

        // 기본기능막기
        e.preventDefault();

        let txt = $(this).text().toLowerCase();
        // toLowerCase() 소문자변환 => 파라미터값(pm)이랑 똑같이 만들려고
        console.log("체험존:", txt);

        // 파라미터 변수값 업데이트
        pm = txt;
        console.log("체험존pm업뎃:", txt);
        // pm값이 뷰JS 인스턴스 안에 catName 변수로 세팅되어 있지만
        // 이 값을 업데이트 해도 페이지가 업데이트 되지 않음
        // 왜? 이것은 뷰JS의 변수가 아니기 때문

        // 뷰JS의 대표특징인 양방향 바인딩 
        // 즉, 뷰JS를 업데이트하면 화면이 업데이트 되는 기능
        // 뷰JS의 데이터인 catName을 업데이트 하면 된다

        // 뷰JS에 변수 접근법:
        // 뷰JS 인스턴스를 변수에 담는다 -> db
        // 변수.$data.변수명 = 값
        db.$data.catName = txt.replace(' & ','-');


    }); ///////// click //////////


}); ///////////// 로딩구역 ////////////////////////
//////////////////////////////////////////////////