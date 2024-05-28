// 보그 PJ 메인 JS - main.js

//상단영역 불러오기
import TopArea from "./components/TopArea";
//메인영역 불러오기
import MainArea from "./components/MainArea";
//아이템영역 불러오기
import ItemsArea from "./components/ItemsArea";
//하단영역 불러오기
import FooterArea from "./components/FooterArea";
import Gallery from "./components/Gallery";

// import { useState } from "react"; <-cdn방식에서는 지원하지 않음
// [1] 메인 페이지 전체 레이아웃 로딩 컴포넌트 ///
function Layout() {
    
    // 상태관리변수 설정구역 ///////////////
    // [1] 메뉴 변경 상태변수
    const [menu,setMenu] = React.useState("home");
    


    // 화면 렌더링 직전에 CSS로딩 변경하기///////////////////
    React.useLayoutEffect(()=>{
        // menu 상태변수에 의존시킨다!
        // 메인 css 대상요소 : #main-css
        document.querySelector("#main-css").href=
        menu=="home"
        ?  "./css/main.css"
        :menu=="gallery"
        ?"./css/gallery.css"
        :"./css/items.css";
        //menu값이 "home"인 경우 main.css를 로딩하고
        //menu값이 "gallery" 인경우 gallery.css를 로딩하고
        //기타 메뉴인 경우 items.css를 로딩한다!
        
    },[menu]);//////////////////////////////////////////


    
    // 리턴코드구역 //////
    return (
           <React.Fragment>
                {/* 1. 상단영역 컴포넌트 */}
                <TopArea changeMenu={setMenu} />
                {/* 2. 메인영역 컴포넌트 */}
                {menu=="home"
                ?<MainArea />
                :menu=="gallery"
                ?<Gallery/>
                :<ItemsArea catName={menu}/>
                }
                {/* 3. 하단영역 컴포넌트 */}
                <FooterArea />
           </React.Fragment>
    );
} ///////// LayOut 컴포넌트 /////////

// 상단영역 출력하기///////////////////////////////
// ReactDOM.render(어쩌구,저쩌구);
// ReactDOM.render(<TopArea />,document.querySelector("#top-area"));
// 메인영역 출력하기//////////////////////////////
// ReactDOM.render(<MainArea/>,document.querySelector("#main-area"));
//하단영역 출력하기///////////////////////
// ReactDOM.render(<FooterArea/>, document.querySelector("#footer-area"));
// ↓
// 메인 페이지(상단영역, 메인영역, 하단영역) 전체 출력하기
ReactDOM.render(<Layout/>, document.querySelector("#root"));
