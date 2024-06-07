// 메인 페이지 컴포넌트 ///

import Banner from "../modules/Banner";

export default function Main(){

    //// 코드 리턴구역 //////////////
    return(
        <>
           {/* 배너 컴포넌트 삽입 
           "main"이름 뒤에 숫자는 1~3 사이 랜덤수 */}
           <Banner catName={"main" + Math.ceil(Math.random()*3)}/>
           {/* 배너 컴포넌트 삽입 */}
           <Banner catName="CHARACTERS"/>
        </>
    );

} /////////// Main /////////////////////