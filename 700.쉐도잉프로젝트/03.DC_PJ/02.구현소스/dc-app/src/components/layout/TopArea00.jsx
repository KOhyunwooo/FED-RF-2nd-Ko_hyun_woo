// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { menu } from "../data/gnb";
import { Link, useNavigate } from "react-router-dom";

// 상단영역 CSS불러오기
import "../../css/top_area.scss";

import Logo from "../modules/Logo";

/* 폰트어썸 불러오기 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import { memo, useContext } from "react";
import { dCon } from "../func/dCon";

// 메모이제이션 적용하기! /////
// -> 그.러.나... 단순히 적용하면 효과가 없음!
// 이유는? 컨텍스트 API가 전역적인 함수/변수를 전달하고 있어서
// 매번 새롭게 리랜더린 됨으므로 인해 메모이제이션 갱신을
// 하게끔 하기에 효가가 없는것!!!
// ->>> 방법은? 컨텍스트API를 사용하지 말고
// props로 전달하는 방식으로 전환하면 효과를 볼 수 있다!
// -> React.memo는 전달속성이 변경됨을 기준하여
// 메모이제이션 기능를 제공하기 때문이다!
// -> 전달되는 함수가 반드시 useCallback() 처리가 되어야 한다!!!
export const TopArea=memo(()=> {
    console.log("상단영역!!!")
    
    // 컨텍스트 사용하기
    const myCon=useContext(dCon);

    // 이동함수 만들기///
    const goNav = useNavigate();
    // 사용시 goNav(라우터주소, {전달객체})
    // 전달객체 없으면 비워놓음!
    // Link to와 비슷함
    // 사용법: 반드시 useNavigate()메서드를 변수에 담아
    // 이동할 라우터 주소를 쓰면 이동한다
    // 예) goNav('/news') -> 뉴스페이지이동
    // 예) goNav('/') -> 첫페이지이동
    // 이동주소는 대소문자 구분없음!
    // 슬래쉬 없이 써도 루트로 인식함
    // ->빈값이면 루트로 이동함!

    // 검색관련 함수들//////////////
    // 1. 검색창 보이기함수
    const showSearch = (e) => {
        //기본기능막기(a태그 이동을 막음) ***개중요
        e.preventDefault();
        //1. 검색창 보이기
        $(".searchingGnb").show();
        // show() - display를 보이게함
        //2.입력창에 포커스 보내기: 검색창이 보이면 포커스를 #schinGnb에 넣어라.
        $("#schinGnb").focus();
    };

    // 2. 검색창에 엔터키 누르면 검색함수 호출
    const enterKey = (e) => {
        //e.keyCode는 숫자, e.key문자로 리턴함
        // console.log(e.key, e.keyCode);  /콘솔찍어봤을떄 키보드 enter키가 13번으로 나옴.
        if (e.key == "Enter") {
            //입력창의 입력값 읽어오기:val()사용,trim() 은 앞뒤 공백지우기
            let txt = $(e.target).val().trim();
            console.log(txt);
            // 빈값이 아니면 검색함수 호출(검색어 전달!)
            if (txt != "") {
                //txt가 빈값이 아니면
                // 입력창 비우고: $(e.target).val(""),부모박스 닫기: .parent().hide();
                $(e.target).val("").parent().hide();

                // 검색 보내기
                goSearch(txt);
            }
        }
    };
    // 3. 검색페이지로 검색어와 함께 이동하기 함수
    const goSearch = (txt) => {
        console.log("나는 검색하러 간다구~");
        //라우터로 이동함수 이동하기
        // goNav("라우터 주소(보낼주소)",{state:{보낼 객체}})
        goNav("search", { state: { keyword: txt } });
    };

    //// 코드 리턴구역 //////////////
    return (
        <>
            {/* 1.상단영역 */}
            <header className="top-area">
                {/* 로그인 환영메시지 박스 */}
                <div className="logmsg">{myCon.loginMsg}</div>
                {/* 네비게이션 GNB파트 */}
                <nav className="gnb">
                    <ul>
                        {/* 1. 로고 컴포넌트 ****************************************/}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    //기본이동막기
                                    e.preventDefault();
                                    //라우터 이동 메서드 호출
                                    goNav("/");
                                }}
                            >
                                <Logo logoStyle="top" />
                            </a>
                            {/* <Link to="/">
                                <Logo logoStyle="top" />
                            </Link> */}
                        </li>
                        {/* 2. GNB메뉴 데이터 배열로 만들기 ******************************/}
                        {menu.map((v, i) => (
                            <li key={i}>
                                {
                                    // 하위 메뉴가 있으면 일반 a요소에 출력
                                    // 없으면 Link 라우팅 출력
                                    v.sub ? ( //v.sub가있냐?
                                        <a href="#">{v.txt}</a> //그러면 이거 출력
                                    ) : (
                                        <Link to={v.link}>{v.txt}</Link> //아니면 여기로 출력
                                    )
                                }
                                {
                                    // 서브 메뉴 데이터가 있으면 하위 그리기////////////
                                    v.sub && (
                                        <div className="smenu">
                                            <ol>
                                                {v.sub.map((v, i) => (
                                                    <li key={i}>
                                                        <Link to={v.link}>
                                                            {v.txt}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                    )
                                }
                            </li>
                        ))}
                        {/* 3. 검색, 회원가입, 로그인 링크 *************************************************/}
                        <li
                            style={{
                                marginLeft:
                                    "auto" /* li가 오른쪽 끝에 붙게 함 */,
                                marginRight: "25px",
                            }}
                        >
                            {/* 검색입력박스 */}
                            <div
                                className="searchingGnb"
                                // style={{ display: "block" }}
                            >
                                {/* 검색버튼 돋보기 아이콘 */}
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="schbtnGnb"
                                    title="Open search"
                                />
                                {/* 입력창 */}
                                <input
                                    type="text"
                                    name="schinGnb" /* name은 백엔드 개발자를 위한 약속, 보통id랑 같은이름으로 함 */
                                    id="schinGnb"
                                    placeholder="검색"
                                    onKeyUp={enterKey}
                                />
                            </div>
                            {/* 검색기능 링크_ 클릭시 검색창보이기 */}
                            <a href="#" onClick={showSearch}>
                                <FontAwesomeIcon icon={faSearch} />
                            </a>
                        </li>

                        {
                            /* 회원가입 로그인버튼 은 로그인상태가 null 일때 나옴//////////////////////////////// */
                            myCon.loginSts===null&&
                            <>
                                <li>
                                    <Link to="/member">JOIN US</Link>
                                </li>
                                <li>
                                    <Link to="/login">LOGIN</Link>
                                </li>
                            </>
                        }
                        {
                            /* 로그인 상태이면 로그아웃 버튼 보임 */
                            myCon.loginSts !== null&&
                            <>
                                
                                <li>
                                    <a href="#" onClick={(e)=>{
                                        // 기본기능막기
                                        e.preventDefault();
                                        // 로그아웃처리함수 호출
                                        myCon.logoutFn();
                                    

                                    }}>
                                        LOGOUT
                                    </a>
                                </li>
                            </>
                        }
                    </ul>
                </nav>
            </header>
        </>
    );
}) /////////// TopArea ///////////////////
