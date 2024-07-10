import React from "react";

//제이쿼리 불러오기
import $ from "jquery";
//부드러운 스크롤 js
import { scrolled, setPos } from "../../js/func/smoothScroll24";
// css불러오기
import "../../css/fashion.scss";
import { useLayoutEffect } from "react";

//use컨텍스트, pcon 불ㄹ어오기
import { useContext } from "react";
import { pCon } from "../modules/pCon";
import { useEffect } from "react";

function Fashion(props) {//fashion컴포넌트 마운트/////////////////////////////////////////////////////////////////////////////
    // 컨텍스트 API사용하기
  const myCon = useContext(pcon);
    
    
    
    //useLayoutEffect:화면 렌더링전(나타니기전) 한번만 실행구역////////////////////////////
    // 뭔가 미리 DOM셋팅이 필요한 코드는 여기서작성!
    useLayoutEffect(()=>{
        
        document.addEventListener("wheel",scrolled,{passive:false});
        // 이벤트 설정시 passive:false 설정의 이유는
        // 기본 설정값은 true이고 이것은 window,document,body
        // 이 세가지에 preventDefault() 기본작동막기를 할 경우
        // 이것을 사용할 수 없도록 설정된 값이 treu다!
        // passive모드를 false로 꺼놔야 window,document,body
        // 에 대한 기본 막기가 가능함!(여기서는 스크롤 기능임!)
        
        // 부드러운 스크롤 위치 초기화
        // setPos(0);
        // 실제 스크롤 위치값 초기화
        window.scrollTo(0,0);
        
        // 스크롤바 생성하기(x축은 숨김)
        $("html,body").css({overflow:"visible",overflowX:"hidden"})
        
        
        
        
        // 소멸자 구역//////////컴포넌트 언마운트 될때
        return(()=>{
            //부드러운 스크롤 제거
            document.removeEventListener("wheel",scrolled,{passive:false});
              // 스크롤바 없애기
            $("html,body").css({
              overflow: "hidden",
            });
        
            // 부드러운 스크롤 위치초기화
            setPos(0);
        
            // 실제 스크롤위치값 초기화
            window.scrollTo(0, 0);
        
        
        });
        
        //useEffect:화면에 요소가 실제로 출력된후 실행구역//////////////////////////////
        // DOM이벤트 설정시 여기서 코딩해야 적용됨
        // 실제 DOM이 화면출력전 가상 DOM에서 태그가
        // 모두 만들어진 후가 useLayoutEffect임!
        // 뭔가 미리 DOM셋팅이 필요한 코드는 여기서 작성!
        useEffect(()=>{
                
                  // 로고클릭시 페이지 이동하기
            $("#logo a").on("click", (e)=>{
                e.preventDefault();
                myCon.setPgName("main");
            },[]);//////click///////
            })//////////////////////////////////////////////////////////////////////////
    },);////////////////////////////////////////////////////////////////////////////
    

    //코드 리턴 구역///////////////////
    return (
        <>
            {/* 1. 배너영역 */}
            <section id="ban" className="page"></section>
            {/* 2. 신상품영역 */}
            <section id="c1" className="cont sc-ani c1"></section>
            {/* 2.5. 상세보기박스 */}
            <div className="bgbx"></div>
            {/* 3. 패럴랙스 영역 : 리액트용 패럴랙스 적용 */}
            <section id="c2" className="cont"></section>
            {/* 4. 단일상품영역 */}
            <section id="c3" className="cont c3"></section>
            {/* 5. 스타일상품영역 */}
            <section id="c4" className="cont c4"></section>
        </>
    );
}///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default Fashion;
