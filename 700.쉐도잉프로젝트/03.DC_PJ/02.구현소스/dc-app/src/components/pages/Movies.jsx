// 무비스 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import VidIntro from "../modules/VidIntro";

export default function Movies(){

    //// 코드 리턴구역 //////////////
    return(
        <>
           <Banner catName="MOVIES"/>
           {/* 2. 무비스 컴포넌트 */}
           <VidIntro catName="MOVIES" clsName="on"/>
        </>
    );

} /////////// Movies /////////////////////