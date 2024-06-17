// 상단영역 컴포넌트 ///

// GNB 데이터 불러오기
import { Link, useNavigate } from "react-router-dom";
import { menu } from "../data/gnb";

// 상단영역 CSS불러오기
import "../../css/top_area.scss";

import Logo from "../modules/Logo";

/* 폰트어썸 불러오기 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function TopArea() {
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

    //// 코드 리턴구역 //////////////
    return (
        <>
            {/* 1.상단영역 */}
            <header className="top-area">
                {/* 로그인 환영메시지 박스 */}

                {/* 네비게이션 GNB파트 */}
                <nav className="gnb">
                    <ul>
                        {/* 1. 로고 컴포넌트 */}
                        <li>
                            <a
                                href="#"
                                onClick={(e) => {
                                    //기본이동막기
                                    e.preventDefault();
                                    //라우터 이동 메서드 호출
                                    goNav("/movies");
                                }}
                            >
                                <Logo logoStyle="top" />
                            </a>
                            {/* <Link to="/">
                                <Logo logoStyle="top" />
                            </Link> */}
                        </li>
                        {/* 2. GNB메뉴 데이터 배열로 만들기 */}
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
                                    // 서브 메뉴 데이터가 있으면 하위 그리기
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
                        {/* 3. 검색, 회원가입, 로그인 링크 */}
                        <li
                            style={{
                                marginLeft:
                                    "auto" /* li가 오른쪽 끝에 붙게 함 */,
                                marginRight: "25px",
                            }}
                        >
                            <h1>난 검색,회원가입,로그인링크</h1>
                            {/* 검색입력박스 */}
                            <div className="searchingGnb" style={{display:"block"}}>
                                {/* 검색버튼 돋보기 아이콘 */}
                                <FontAwesomeIcon icon={faSearch} className="schbtnGnb"/>
                                {/* 입력창 */}
                                <input
                                    type="text"
                                    name="schinGnb" /* name은 백엔드 개발자를 위한 약속, 보통id랑 같은이름으로 함 */ 
                                    
                                    id="schinGnb"
                                    placeholder="Filter by keyword"
                                />

                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
} /////////// TopArea ///////////////////
