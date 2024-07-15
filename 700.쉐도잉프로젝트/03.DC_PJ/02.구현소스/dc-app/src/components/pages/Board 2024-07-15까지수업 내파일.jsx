// 오피니언 페이지 컴포넌트 ///
import { Fragment, useContext, useRef, useState } from "react";

// 사용자 기본정보 생성 함수
// import { initData } from "../func/mem_fn";

// 로컬스토리지 게시판 기본데이터 제이슨 -> 로컬쓰로 대체!!!
// import baseData from "../data/board.json";
// 리액트 웹펙에서 제이슨은 이름을 지어서 불러오면된다!
// 제이슨 파일 처리는 다르므로 확장자는 반드시 씀!

// 제이쿼리
import $ from "jquery";

// 게시판용 CSS
import "../../css/board.scss";
import "../../css/board_file.scss";

// 로컬스토리지 확인 JS
import { initBoardData } from "../func/board_fn";
import { dCon } from "../func/dCon";

export default function Board() {
    // 컨텍스트 사용하기
    const myCon=useContext(dCon);//
    // 전역로그인 상태변수 확인하기
    const sts= myCon.loginSts;
    console.log("loginsts(로그인 상태)",sts);




    // 로컬스토리지 게시판 데이터 정보확인! //
    initBoardData();

    // 로컬스 데이터 변수할당하기!
    const baseData = JSON.parse(localStorage.getItem("board-data"));

    // [ 상태관리 변수 ] ///
    // [1] 페이지 번호
    const [pageNum, setPageNum] = useState(1);
    // [2] 기능모드
    const [mode, setMode] = useState("L");//useState로 상태가 변경되면 컴포넌트는 리렌더링됨.
    // (1) 리스트 모드(L) : List Mode
    // (2) 글보기 모드(R) : Read Mode
    // (3) 글쓰기 모드(W) : Write Mode
    // (4) 수정 모드(M) : Modify Mode (삭제포함)

    // [ 참조변수 ] ///
    // [1] 전체 개수 - 매번 계산하지 않도록 참조변수로!
    const totalCount = useRef(baseData.length);
    // console.log("전체개수:", totalCount);

    // [2] 선택 데이터 저장
    const selRecord = useRef(null);
    // -> 특정리스트 글 제목 클릭시 데이터 저장함!

    // 페이지당 개수
    const unitSize = 8;

    /********************************************** 
        함수명: bindList
        기능 : 페이지별 리스트를 생성하여 바인딩함(화면에 데이터 뿌려주는 함수)
    **********************************************/
    const bindList = () => {
        //console.log(baseData);

        // 1. 전체 원본데이터 선택
        let orgData = baseData;

        // 2. 정렬 적용하기 : 내림차순
        orgData.sort((a, b) =>
            Number(a.idx) > Number(b.idx)
                ? -1
                : Number(a.idx) < Number(b.idx)
                ? 1
                : 0
        );

        // 3. 일부 데이터만 선택
        // 예시로 0번부터 9번까지만 선택
        // 한페이지당 10개라면...
        // 페이지 번호와 연관시켜 본다!
        // 1,2,3,4,...

        // 시작번호 = (페이지번호-1)*단위수
        let sNum = (pageNum - 1) * unitSize;
        // 끝번호 = 페이지번호*단위수
        let eNum = pageNum * unitSize;
        // console.log("첫번호:", sNum, "/끝번호:", eNum);
        // 결과배열
        const selData = [];

        // for문으로 배열 만들기
        for (let i = sNum; i < eNum; i++) {
            // console.log(i);
            // 끝번호가 전체 개수보다 크면 나가라!
            if (i >= totalCount.current) break;
            // 대상배열값 추가
            selData.push(orgData[i]);
        } ///// for //////

        // console.log("일부데이터:", selData);

        return selData.map((v, i) => (
            <tr key={i}>
                {/* 시작번호를 더하여 페이지별 순번을 변경 */}
                <td>{i + 1 + sNum}</td>
                <td>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault(); //읽기모드로 변경
                            setMode("R"); //읽기모드로 변경!
                            selRecord.current = v; // 해당 데이터 저장하기
                        }}
                    >
                        {v.tit}
                    </a>
                </td>
                <td>{v.unm}</td>
                <td>{v.date}</td>
                <td>{v.cnt}</td>
            </tr>
        ));
    }; /////////// bindList 함수 /////////////////

    /****************************************** 
    함수명 : pagingList
    기능 : 게시판 리스트의 페이징 기능 목록
  ******************************************/
    const pagingList = () => {
        // 전체 페이징 개수 : 전체레코드수 / 페이지당개수
        // 유의점: 나머지가 있는지 검사해서 있으면 +1

        // 1. 페이징 개수
        let pagingCount = Math.floor(totalCount.current / unitSize);

        // 나머지가 있으면 다음 페이지가 필요함!
        // 나머지가 0이 아니면 1더하기
        if (totalCount.current % unitSize > 0) {
            pagingCount++;
        }

        //     console.log(
        //     "페이징개수:",
        //     pagingCount,
        //     "나머지개수:",
        //     totalCount.current % unitSize
        // );

        // 링크코드 만들기 ///
        const pgCode = [];

        // 1부터 페이지 끝번호까지 돌면서 코드만들기
        for (let i = 1; i <= pagingCount; i++) {
            pgCode.push(
                <Fragment key={i}>
                    {
                        // 페이징번호와 현재페이지번호 일치시 b요소
                        i === pageNum ? (
                            <b>{i}</b>
                        ) : (
                            // 불일치시에 모드 링크코드
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPageNum(i);
                                }}
                            >
                                {i}
                            </a>
                        )
                    }
                    {/* 사이에 바넣기 */}
                    {i !== pagingCount && " | "}
                </Fragment>
            );
        } ////// for /////

        // 코드리턴
        return pgCode;
    }; ////////// pagingList 함수 //////////////

    // 버튼 클릭시 변경함수//////////
    const clickButton = (e) => {
        // 버튼 글자 읽기
        let btnText = e.target.innerText; //버튼은 하위가 없으면 target을 써도 됨(원래는 currenttarget)
        // console.log(btnText);
        // 버튼별 분기//////
        switch (btnText) {
            //쓰기모드로 변경
            case "Write":
                setMode("W");
                // console.log("글써라!");
                break;
            // 리스트모드로 변경
            case "List":
                setMode("L");
                break;
            // 서브밋일 경우 함수호출!
            case "Submit":
                submitFn();
                break;
            // 수정일 경우 수정모드로 변경
                case "수정":
                    setMode("M");
                break;

         
        }
    }; //////////clickButton //////////////

    // 서브밋 처리함수/////////////
    const submitFn=()=>{
        // 제목입력항목
        let title = $(".subject").val().trim();
        // 내용입력항목
        let cont= $(".content").val().trim();
        // trim()으로 앞뒤공백 제거후 검사!
        
                
        //1.공통 유효성 검사
        // 제목, 내용 모두 비었으면 리턴!
        if(title==''||cont==''){
            alert("Insert title or content!");
            return; // 서브밋없이 함수 나가기
        }
        //2. 글쓰기 서브밋(mode=="W")
        if(mode=="W"){
            // 0. 현재 로그인 사용자 정보 파싱해서 읽을수 있게 만듦
            let person = JSON.parse(sts);

            // 1. 오늘날짜 생성하기
            let today= new Date();
            // yy-mm-dd 형식으로 구하기:
            // 1) 제이슨 날짜형식: toJSON()
            // 2) ISO표준형식: toISTstring()
            // 시간까지 나오므로 앞에 10자리만 가져감! 문자열자르기: .substr(0,10)
            // today.toISOString().substr(0,10)

            // 2. 글번호 만들기
            // 전체 데이터중 idx만 모아서 배열만들기
            let arrIdx= baseData.map(v=>parseInt(v.idx));//그냥 v.idx하면 문자라서 parseInt: 정수변환 해야함.
            // console.log("idx만 모였냐?",arrIdx);
            // 최대값 찾기: 스프레드 연산자(...)로 '배열값'만 넣음!
            let maxNum=Math.max(...arrIdx);
            // console.log("최대숫자",maxNum);
            
            // 3. 입력 데이터 객체형식으로 구성하기
            let data = {
                idx: maxNum + 1,
                tit: title,
                cont: cont,
                att: "",
                date: today.toJSON().substr(0, 10),
                uid: person.uid,
                unm: person.unm,
                cnt: "0",
            }
            console.log("글쓰기 서브밋:",data)
        
            // 4. [[[로컬스에 입력하기]]]///
            // (1) 로컬스 파싱
            let locals=localStorage.getItem("board-data");
            locals=JSON.parse(locals);
            // (2) 파싱배열에 push
            locals.push(data);
            // (3) 새배열을 문자화하여 로컬스에 넣기(로컬스에 넣을때는 JSON.stringify()로 문자화 해서 넣어야함!!!)
            localStorage.setItem("board-data",JSON.stringify(locals));
            //로컬스 확인
            // console.log(JSON.stringify(locals));

            //5. 리스트로 돌아가기->모드변경! "L" (리렌더링);
            setMode("L");//함수 상단으로 이동시켜도 프로세서를 다 진행후에 실행된다, 리렌더링이 예약되는거임.
            
        }


        //3. 수정모드 서브밋(mode=="M")





    };/////////////////submitFn////////////////////

    //// 코드 리턴구역 //////////////
    return (
        <main className="cont">
            <h1 className="tit">OPINION</h1>
            {
                // 1. 리스트 모드일 경우 리스트 출력하기
                mode == "L" && (
                    <ListMode bindList={bindList} pagingList={pagingList} />
                )
            }
            {
                // 2. 읽기 모드일 경우 리스트 출력하기
                mode == "R" && <ReadMode selRecord={selRecord} />
            }
            {
                // 3. 쓰기 모드일 경우 로그인정보 보내기
                // sts값은 문자열이므로 파싱하여 객체로 보냄
                mode == "W" && <WriteMode sts={JSON.parse(sts)} />
            }
            {
                // 4. 수정 모드일 경우 상세보기 출력하기
                mode == "M" && <ModifyMode  selRecord={selRecord}  />
            }
            <br />
            {/* 모드별 버튼출력 박스 */}
            <table className="dtbl btngrp">
                <tbody>
                    <tr>
                        <td>
                            {
                                //1. 글쓰기(Write) 버튼은  "L"이고, 로그인상태이면 출력(L과,sts가 모두 true일때)
                                //null은 false처리난다, 로그인 하지 않으면 sts에 null이 들어가기 때문에 write버튼이 생성되지 않음
                                mode == "L" && sts && (
                                    <button onClick={clickButton}>Write</button>
                                )
                            }
                            {
                                //2. 읽기 상태 "R" 상태일 경우
                                <>
                                {mode == "R" && (
                                    <button onClick={clickButton}>List</button>
                                )}

                                {// 현재글은 selRecord 참조변수에 저장됨
                                // 글정보 항목중 uid가 사용자 아이디임!
                                // 로그인 상태정보하위의 sts.uid와 비교함
                                (mode == "R" && sts && 
                                JSON.parse(sts).uid==selRecord.current.uid) && (//로그인한 상태이고 글쓴이와 일치할때
                                <button onClick={clickButton}>수정</button>//수정보드 일동버튼이 노출됨
                                )}
                                {console.log("비교:",JSON.parse(sts).uid,"==?",selRecord.current.uid)}
                                
                                </>
                            }
                            {
                                //3. 쓰기상태 "W" 일 경우
                                mode == "W" && (
                                    <>
                                    <button onClick={clickButton}>Submit</button>
                                    <button onClick={clickButton}>List</button>
                                    </>
                                )
                            }
                            {
                                //4. 수정상태 "M" 일 경우
                                mode == "M" && (
                                    <>
                                    <button onClick={clickButton}>Submit</button>
                                    <button onClick={clickButton}>List</button>
                                    <button onClick={clickButton}>Delete</button>
                                    </>
                                )
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
} /////////// Board /////////////////////

/****************************************** 
        리스트 모드 서브 컴포넌트
******************************************/
const ListMode = ({ bindList, pagingList }) => {
    return (
        <>
            <div className="selbx">
                <select name="cta" id="cta" className="cta">
                    <option value="tit">Title</option>
                    <option value="cont">Contents</option>
                    <option value="unm">Writer</option>
                </select>
                <select name="sel" id="sel" className="sel">
                    <option value="0">Descending</option>
                    <option value="1">Ascending</option>
                </select>
                <input id="stxt" type="text" maxLength="50" />
                <button className="sbtn">Search</button>
            </div>
            <table className="dtbl" id="board">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Writer</th>
                        <th>Date</th>
                        <th>Hits</th>
                    </tr>
                </thead>
                <tbody>{bindList()}</tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" className="paging">
                            {pagingList()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}; //////////// ListMode ///////////////////

/****************************************** 
        읽기 모드 서브 컴포넌트
******************************************/

const ReadMode = ({ selRecord }) => {
    // 읽기 모드가 호출되었다는 것은
    // 리스트의 제목이 클릭되었다는 것을 의미!
    // 따라서 현재 레코드 값도 저장되었다는 의미!
    // console.log("전달된 참조변수:", selRecord.current);
    // 전달된 데이터 객체를 변수에 할당
    const data = selRecord.current;

    return (
        <>
            <table className="dtblview readone">
                <caption>OPINION : Read</caption>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input
                                type="text"
                                className="name"
                                size="20"
                                readOnly
                                value={data.unm}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input
                                type="text"
                                className="subject"
                                size="60"
                                readOnly
                                value={data.tit}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea
                                className="content"
                                cols="60"
                                rows="10"
                                readOnly
                                value={data.cont}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Attachment</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}; //////ReadMode///////////


/****************************************** 
        쓰기 모드 서브 컴포넌트
******************************************/
const WriteMode = ({sts}) => {
    // sts-로그인 상태정보 
    // 로그인한 사람만 글쓰기 가능
    console.log("WirteMode에 sts들어왔나?",sts);

    return (
        <>
            <table className="dtblview readone">
                <caption>OPINION : Write</caption>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input
                                type="text"
                                className="name"
                                size="20"
                                //로그인한 사람 이름
                                value={sts.unm}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>
                            <input
                                type="text"
                                className="email"
                                size="40"
                                //로그인한 사람 이메일
                                value={sts.eml}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input
                                type="text"
                                className="subject"
                                size="60"                              
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea
                                className="content"
                                cols="60"
                                rows="10"
                                
                               
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Attachment</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}; //////WriteMode///////////






/****************************************** 
        수정 모드 서브 컴포넌트
******************************************/

const ModifyMode = ({ selRecord }) => {
    // 읽기 모드가 호출되었다는 것은
    // 리스트의 제목이 클릭되었다는 것을 의미!
    // 따라서 현재 레코드 값도 저장되었다는 의미!
    // console.log("전달된 참조변수:", selRecord.current);
    // 전달된 데이터 객체를 변수에 할당
    const data = selRecord.current;

    return (
        <>
            <table className="dtblview readone">
                <caption>OPINION : Read</caption>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input
                                type="text"
                                className="name"
                                size="20"
                                readOnly
                                value={data.unm}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>
                            <input
                                type="text"
                                className="subject"
                                size="60"
                                
                                defaultValue={data.tit}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>Content</td>
                        <td>
                            <textarea
                                className="content"
                                cols="60"
                                rows="10"
                  
                               defaultValue={data.cont}
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>Attachment</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}; //////ModifyMode///////////