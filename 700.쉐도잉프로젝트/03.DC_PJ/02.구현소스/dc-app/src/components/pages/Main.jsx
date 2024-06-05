// 메인 페이지 컴포넌트 ///

import Banner from "../modules/Banner";

export default function Main(){

    //// 코드 리턴구역 //////////////
    return(
        <>
           {/* 배너 컴포넌트 삽입 */}
           <Banner catName="COMICS"/>
           {/* 배너 컴포넌트 삽입 */}
           <Banner catName="CHARACTERS"/>
        </>
    );

} /////////// Main /////////////////////