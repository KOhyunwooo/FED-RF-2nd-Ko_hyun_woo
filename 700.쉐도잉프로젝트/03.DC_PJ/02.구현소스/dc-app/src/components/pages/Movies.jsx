// 무비스 페이지 컴포넌트 ///

import Banner from "../modules/Banner";
import VidIntro from "../modules/VidIntro";
import VidSwipe from "../modules/VidSwipe";

export default function Movies(){

    //// 코드 리턴구역 //////////////
    return(
        <>
           <Banner catName="MOVIES"/>
           {/* 2. 무비스 컴포넌트 */}
           <VidIntro catName="MOVIES" clsName="on"/>

           
           {/* 4. 비디오스와이프 컴포넌트 */}
           <VidSwipe catName="movies"/>

        </>
    );

} /////////// Movies /////////////////////