import React from "react";
import MainCont from "../pages/MainCont";
import Fashion from "../pages/Fashion";
import ItemList from "../pages/ItemList";

function MainArea({ page }) {
    //page 페이지 변경 문자값 전달: main/itemlist/men/women/style
    console.log("메인전달page",page)
    return (
        <>
            {/* 조건출력으로 페이지별 분기 */}
            {page == "main" && <MainCont />}
            {page == "item-list" && <ItemList />}
            {(page == "men" ||
            page == "women" ||
            page == "style" )
            
            
            && <Fashion subCat={page}/>}
        </>
    );
}

export default MainArea;
