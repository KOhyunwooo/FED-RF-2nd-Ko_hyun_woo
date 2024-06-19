import React from "react";
import MainCont from "../pages/MainCont";
import Fashion from "../pages/Fashion";

function MainArea({ page }) {
    //page 페이지 변경 문자값 전달: main/glist/men/women/style
    console.log("메인전달page",page)
    return (
        <>
            {/* 조건출력으로 페이지별 분기 */}
            {page == "main" && <MainCont />}
            {(page == "men" ||
            page == "women" ||
            page == "style" )
            
            
            && <Fashion subCat={page}/>}
        </>
    );
}

export default MainArea;
