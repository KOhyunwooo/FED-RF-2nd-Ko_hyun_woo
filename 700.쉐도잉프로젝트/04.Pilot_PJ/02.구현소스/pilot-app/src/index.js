import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import TopArea from './components/layout/TopArea';
import MainArea from './components/layout/MainArea';
import FooterArea from './components/layout/FooterArea';

// 컨텍스트 API불러오기
import { pcon } from './components/modules/pcon';

// 전체 공통 CSS
import "./css/index.scss";
import { useState } from 'react';

function MainComponent(props) {
    // 상태관리 변수 셋팅//////
    // 1. 페이지변경 상태 변수
    const [pgName,setPgName] = useState("main");
    /************************************
     [컨텍스트 API공개 변수들: 전역변수]
     1. setPgName - 페이지이동 업데이트 메서드
       
     ************************************/

  return (
    /* 전역으로 공개할 변수는{{ }}안에 쓴다. */
    <pcon.Provider value={{setPgName}}>

    
      <TopArea />
      {/* page={main}:페이지 전달 연결된데에서 function MainArea({ page }) page를 써서 전달, 받는곳에서 page={main} 받기 */}
      {/*  */}
      <MainArea page={pgName}/>
      <FooterArea />
    
    </pcon.Provider>
  );
}

// 출력하기 //////
const root = createRoot(document.querySelector("#root"))
root.render(<MainComponent />);
