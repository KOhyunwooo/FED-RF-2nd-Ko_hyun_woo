// 보그 PJ 메인 JS - items.js

//상단영역 불러오기
import TopArea from "./components/TopArea";

//아이템영역 불러오기
import ItemsArea from "./components/ItemsArea";

//하단영역 불러오기
import FooterArea from "./components/FooterArea";

// [1] 아이템 페이지 전체 레이아웃 로딩 컴포넌트 ///
function Layout() {
    // 리턴코드구역
    return (
           <React.Fragment>
                {/* 1. 상단영역 컴포넌트 */}
                <TopArea />
                {/* 2. 메인영역 컴포넌트 */}
                <ItemsArea catName="fashion"/>
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
