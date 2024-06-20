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
    const [solt,setSolt] =useState("asc")
    // 값: 오름차순 -asc/ 내림차순-desc (내가)설정함

    //검색어가 있는 데이터 필터하기(filter):filter는 검색결과가 항상 배열로 나옴//////
    const newList= catListData.filter(v=>{

        // 속성중 캐릭터 이름 중 검색(v.cname)
        // 검색어는 모두 영어일 경우 소문자 처리함
        let newVal= v.cname.toLocaleLowerCase();
        // 전달받은 키워드도 소문자 처리
        //((중요!!)) 상태변수인 kw로 대체한다
        let key = kw.toLocaleLowerCase();
        //문자열이 있는값만 배열로 재수집!
        if(newVal.indexOf(key) !==-1) return true;
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

        // [정렬기능 추가하기]//////////////////////////
        //FED-RF-2024 : 90일차 - 3. DC PJ 17편 : [7] 검색모듈3  28:14
        //https://youtu.be/fEtKKDfQE8k?t=1694






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
                                if(e.key=="Enter") setKw(e.target.value)
                                    //input의 값이 value
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
                        <select name="sel" id="sel" className="sel">
                            <option value="0">A-Z</option>
                            <option value="1">Z-A</option>
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
