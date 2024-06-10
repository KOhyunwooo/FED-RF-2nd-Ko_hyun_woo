//import ReactDOM from 'react-dom/client'; 입력후 하단 createRoot에서 ctrl+space로 ReactDOM ^ from 사이에 {createRoot} 생성
import ReactDOM, { createRoot } from 'react-dom/client';

import React from 'react';

function MainComponent(props) {
  return (
    <div>
      <h1>파일럿PJ입니다~</h1>
    </div>
  );
}


//출력하기/////
const root= createRoot(document.querySelector("#root"))

root.render(<MainComponent/>);