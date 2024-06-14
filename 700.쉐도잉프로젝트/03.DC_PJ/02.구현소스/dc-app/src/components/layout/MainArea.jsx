// 메인영역 컴포넌트 ///

import { Outlet } from "react-router-dom";

// Outlet 컴포넌트는 리액트라우터에서 컴포넌트를
// 변경하여 출력하는 자리를 잡아주는 역할을 함!

export default function MainArea(){

    //// 코드 리턴구역 //////////////
    return(
        <main className="cont">
            {/* 싱글페이지에서 Outlet이 꼭 있어야함, 
            그래야 Outlet을 바꿔치기 해서 index.js 에서 라우팅된 이름으로 불러올 수 있음*/}
            <Outlet />
        </main>
    );

} /////////// MainArea /////////////////////