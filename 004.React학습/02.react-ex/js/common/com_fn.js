// 공통 처리js-com_fn.js

// 초이스 인트로 애니 실행함수//////////
const choiceIntroAni = () => {
    // 타이틀 애니매이션////
    $(".tit span")
        .css({ display: "inline-block" })
        .animate({ scale: "180%" }, 1000)
        .animate({ scale: "100%" }, 1000);

    //초이스 메인이미지 애니///
    $(".img-box img").delay(500).fadeTo(1000, 1);
    //소제목 애니///
    $(".stit").delay(1500).fadeTo(1000, 1);
    // fadeTo(시간,투명도) -> opacity만 조절하는 애니메서드
}; //choiceIntroAni///////////////////

// 로고애니 실행함수////////////////
const logoAni = () => {
    //로고 최초 한번만 애니하기
    $("#logo")
        .animate({ scale: "200%", rotate: "180deg" }, 1000)
        .animate({ scale: "100%", rotate: "360deg" }, 1000);
}; //logoAni//////////////////////////

// 셋팅 초기화 함수 호출///////////////
const initFn = () => {
    //메인이미지 ,소제목("공유는 오늘도 멋찝니다!"부분)투명하게 초기화
    $(".img-box img, .stit").css({ opacity: 0 });
    // 스크롤 맨위로 이동하기
    window.scrollTo(0, 0);
};

// 내보내기
export { choiceIntroAni, logoAni, initFn };
