import React, { useState } from "react";

// searching.scss불러오기
import "../../css/searching.scss";
//폰트어썸아이콘
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
//캐릭터 리스트 결과 컴포넌트 불러오기
import SearchingCat from "./SearchingCat";
//catListData데이터 불러오기
import { catListData } from "../data/swiper_cat";


function Searching({kword}) { //()안에 받는 키워드 해야함.
    // kword- 전달받은 키워드
    console.log("kword:", kword);
    console.log("내data:",catListData)
    // 키워드에 따라 검색결과가 달라지므로
    // 핵심데이터인 검색어를 상태관리변수로 만든다!

    //[1] 검색어 상태관리 변수
    const [kw,setKw]=useState(kword); //useState 초기값이 전달받은값
    //[2] 정렬기준 상태관리 변수
    const [sort,setSort] =useState("up")
    // 값: 오름차순 -up/ 내림차순-down (내가)설정함
    //[3] 체크박스 체크여부 상태관리변수
    const [check,setCheck] = useState([true,true,true])//useState기본값:true,ture,ture(체크됨,체크됨,체크됨)



    //검색어가 있는 데이터 필터하기(filter):filter는 검색결과가 항상 배열로 나옴//////
    const newList= catListData.filter(v=>{

        // 속성중 캐릭터 이름 중 검색(v.cname)
        // 검색어는 모두 영어일 경우 소문자 처리함
        let newVal= v.cname.toLocaleLowerCase();
        // 전달받은 키워드도 소문자 처리
        //((중요!!)) 상태변수인 kw로 대체한다
        let key = kw.toLocaleLowerCase();
        //문자열이 있는값만 배열로 재수집!
        if(
            //1과 2의 조건이 모두 true여야 리턴 
            //1.검색어 조건(cname속성)
            (newVal.indexOf(key) !==-1) && //<-&&로 연결하면 둘다true여야함.
            //2.체크박스항목 조건(aliment속성)
            // 주의: 조건문내의 삼항연산자는 반드시 소괄호로 묶어서 논리연산자(&&,||,!)와의 충돌을 막아줘야함
            // or문의 결과가 false이려면 모두 false여야함!
            // 체크박스 모두 불체크시 false로 처리!!    
            (
             (check[0] ? v.alignment=="hero":false)||//check[0]이 트루냐? v.alignment=="hero" 아니면 false)
             (check[1] ? v.alignment=="comp":false)||//check[1]이 트루냐? v.alignment=="comp" 아니면 false)
             (check[2] ? v.alignment=="villain":false) //check[2]이 트루냐? v.alignment=="villain" 아니면 false)
             //https://youtu.be/zluPurKIrWw?t=2046 이해 못함.
            )    
             //true && (true||false||false)
             // -> &&문은 모두 true여야 true
             // -> ||문은 하나만 true면 true

        ) return true;
        // indexOf(key) !==-1 이 아니면 리턴(:filter가 해당항목 수집해서 newList에 들어감)
        // 문자열.indexOf(문자) 문자열 위치번호 리턴함
        // 그런데 결과가 없으면 -1을 리턴함
        // 그래서 -1이 아닐경우 true를 리턴하면
        // filter에서 변수에 저장할 배열로 수집된다!

    });////////////////filter///////////////////////////////////////////////////////
    console.log("newList는?",newList);
    /*     
        배열.filter(v=>{
            if(v.속성명.indexOf(검색어)!=-1) retrun true   // indexOf로 검사 해서 있냐? 그럼 리턴
        })
        ->결과는 검색어가 있는 경우 변수에 모아서 담아준다.
        ->filter는 결과값도 배열, 결과가 없어도 빈배열. 항상 배열로 나옴.    
    */

        //결과내 재검색[데이터 항목중 aliment값으로 검색함! ]////

        //[[정렬기능 추가하기]]// //////////////////////
        //(1)오름차순일 경우
        if(sort=="up"){
            newList.sort((a,b)=>//중괄호 없으면 바로 리턴
                a.cname > b.cname
                ? 1   : a.cname <b.cname 
                ? -1  :0 
                //a.cname > b.cname보다 크냐? 그럼 1(일)단 바꿔 a.cname < b.cname보다 작냐? 그럼 -1(마)꾸지마
            );
        }
        //(2)내림차순일 경우
        else if(sort=="down"){
            newList.sort((a,b)=>//중괄호 없으면 바로 리턴
            a.cname > b.cname
            ? -1   : a.cname <b.cname 
            ? 1  :0 
            
        );
        }






    // 코드 리턴구역 ////////////////////////
    return (
        <>
            {/* 전체 검색모듈 코드 */}
            <section className="schbx">
                {/* 1. 옵션선택박스 */}
                <div className="schopt">
                    {/* 1-1.검색박스 */}
                    <div className="searching">
                        {/* 검색버튼 돋보기 아이콘 */}
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="schbtn"
                            title="Open search"
                        />
                        {/* 입력창 */}
                        <input
                            id="schin"
                            type="text"
                            placeholder="나어디야"
                            defaultValue={kword}
                            //엔터키를 눌렀을때 검색실행!
                            // 검색어 상태변수만 업데이트 하면 끝!
                            // ->setKw(검색어)
                            onKeyUp={(e)=>{

                                if(e.key=="Enter") 
                                    //검색어 상태값 변겯ㅇ
                                    setKw(e.target.value)//input의 값이 value
                                    
                                    //처음검색시 정렬은 기본정렬 오름차순("up")
                                    setSort("up") //<-근데 이렇게하면 우측 셀렉트박스(A-Z,Z-A)는 안바뀜 그래서
                                    document.querySelector("#sel").value="up";//<-이것도 해줘야함

                                    //처음 검색시(엔터시) 모두 체크
                                    setCheck([true,true,true]);
                            }}
                        />
                    </div>
                    {/* 1-2. 체크박스구역 */}
                    <div className="chkbx">
                        <ul>
                            <li>
                                {/* 타이틀 */}
                                <h2>
                                    ALIGNMENT
                                    <span className="spbtn">＋</span>
                                </h2>
                                {/* 체크박스리스트 */}
                                <ol>
                                    <li>
                                        Heroes
                                        {/* 숨긴 체크박스 */}
                                        <input
                                            type="checkbox"
                                            id="hero"
                                            className="chkhdn"
                                            // checked={true}//<-이렇게 하면 체크되서 나옴
                                            //체크박스 체크속성값으로 훅연결!
                                            checked={check[0]}//<-useState첫번째배열임(true)
                                            //체크 변경시onChange
                                            onChange={(e)=>{
                                                console.log("체크박스 체크됐으면 true임",e.target.checked)
                                                //checked는 체크됐으면 true 체크 안됐으면false가 나옴
                                                //훅값 업데이트
                                                setCheck([
                                                    e.target.checked,
                                                    check[1],
                                                    check[2],
                                                ])
                                            }}
                                        />
                                        {/* 디자인노출 라벨 */}
                                        <label
                                            htmlFor="hero"
                                            className="chklb"
                                        ></label>
                                    </li>
                                    <li>
                                        It's Complicated
                                        {/* 숨긴 체크박스 */}
                                        <input
                                            type="checkbox"
                                            id="comp"
                                            className="chkhdn"
                                            checked={check[1]}//<-useState두번째배열임(true)
                                            //체크 변경시onChange
                                            onChange={(e)=>{
                                                console.log("체크박스 체크됐으면 true임",e.target.checked)
                                                //checked는 체크됐으면 true 체크 안됐으면false가 나옴
                                                //훅값 업데이트
                                                setCheck([
                                                    check[0],
                                                    e.target.checked,
                                                    check[2],
                                                ])
                                            }}
                                        />
                                        {/* 디자인노출 라벨 */}
                                        <label
                                            htmlFor="comp"
                                            className="chklb"
                                        ></label>
                                    </li>
                                    <li>
                                        Villains
                                        {/* 숨긴 체크박스 */}
                                        <input
                                            type="checkbox"
                                            id="villain"
                                            className="chkhdn"
                                            checked={check[2]}//<-useState세번째배열임(true)
                                            //체크 변경시onChange
                                            onChange={(e)=>{
                                                console.log("체크박스 체크됐으면 true임",e.target.checked)
                                                //checked는 체크됐으면 true 체크 안됐으면false가 나옴
                                                //훅값 업데이트
                                                setCheck([
                                                    check[0],
                                                    check[1],
                                                    e.target.checked,
                                                ])
                                            }}
                                        />
                                        {/* 디자인노출 라벨 */}
                                        <label
                                            htmlFor="villain"
                                            className="chklb"
                                        ></label>
                                    </li>
                                </ol>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* 2. 결과리스트박스 */}
                <div className="listbx">
                    {/* 2-1. 결과 타이틀 */}
                    <h2 className="restit">BROWSE CHARACTERS</h2>
                    {/* 2-2. 정렬선택박스 */}
                    <aside className="sortbx">
                        <select 
                        name="sel" 
                        id="sel" 
                        className="sel"
                        //값을 변경할때 이벤트발생:onChange
                        onChange={(e)=>{
                            console.log("솔트",e.target.value);//여기서 value는 옵션에 들어있는 value이다.
                            //정렬기준 상태변수 업데이트
                            setSort(e.target.value);
                        }}
                        >
                            <option value="up">A-Z</option>
                            <option value="down">Z-A</option>
                        </select>
                    </aside>
                    {/* 2-3. 캐릭터 리스트 컴포넌트 : 데이터 상태변수 중 첫번째값만 보냄 SearchingCat.jsx불러야함*/}
                    {/* 리턴 돌아서 SearchingCat으로 결과를 보냄 */}
                    <SearchingCat dt={newList} />
                    {/* dt에 newList라는 정보를 보내서 <SearchingCat/>을 실행해 라는 뜻 */}
                </div>
            </section>
        </>
    );
}

export default Searching;
