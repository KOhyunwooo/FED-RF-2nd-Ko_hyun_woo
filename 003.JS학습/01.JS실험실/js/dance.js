//09. 중간스크롤 가로이동 JS-dance.js
// 스크롤시 가로로 넘어가는거

//나의 함수 불러오기

import mFn from './my_function.js';

//[1] 태그 셋팅하기/////////////////////////////////////////////
//1. 3번 스테이지에 ul>li구조 이미지 넣기

// 대상: .slidepg (스티키박스)
const slidePg = mFn.qs('.slidePg');

//2. 코드변수에 태그 만들어 넣기
let hcode="<ul>";
for(let i=1; i<=7; i++){
    hcode+=`
    <li>
        <img src="./images/dance/${i}.jpg" alt="dance image"/>
    </li>
`;
}///////////for////////////////
hcode+="</ul>";

//3. 코드 출력하기
slidePg.innerHTML = hcode;



//[2] 3번째 영역에 도달한 경우 ul박스 가로방향 이동하기///////////////
//1. 대상선정하기///////
// 이벤트 대상: window
// 이벤트 종류: scroll
// 위치기준대상: .tpg-> 스티키를 싸고 있는 부모박스
const tpg = mFn.qs('.tpg');
//움질일 대상: .slidePg>ul
const target= mFn.qs('.slidePg>ul');
// console.log(tpg,target);

//2. 이벤트설정하기///////////
mFn.addEvt(window,'scroll',moveSlide);

//3.함수만들기///////////////
    //(1) 슬라이드 이동함수////////////////////////
    function moveSlide(){
        //1. 스티키 부모박스 바운딩top값
        let bTop=mFn.getBCR(tpg);
        console.log('바운딩top',bTop);

        //2. 이동할 타겟박스 left값으로 
        // 부모 바운딩 top 값 넣기
        //(1)바운딩 top값이 0초과일때 처음위치 재설정하기
        if(bTop > 0){
            target.style.left = '0px';       
        }
        //(2)바운딩 top값이 0이상 -3000이하일때
        //부모 바운딩top값으로 위치이동하기
        else if(bTop <= 0){
        target.style.left = bTop+'px';
        }
        //(3)마지막 한계 이후엔 한계값으로 셋팅
        else{
            target.style.left = -3000+'px';
        }

        
        
    }//////////moveSlide함수/////////////




    

    ///////////////////////////////////////////////////////////
    /////////메뉴 오버시 배경박스 따라다니기 구현//////////////
    //////////////////////////////////////////////////////////
    //1.대상선정
    // 이벤트 대상: .gnb li
    const gnbList=mFn.qsa(".gnb li");
    // 변경대상: .mbg
    const mbg=mFn.qs(".mbg");
    //2.이벤트 설정하기//////////
    //이벤트 종류: mouseenter/mouseleave
    gnbList.forEach(e=>{
        mFn.addEvt(e,"mouseenter",overFn);
        mFn.addEvt(e,"mouseleave",outFn);

    });/////////////forEach///////////
    //3.함수 만들기//////////////
    function overFn(){
        // console.log("오버:",this);
        //1. 오버된 li의 left위치값 읽기
        let posLeft= this.offsetLeft;
        console.log("오버된 li의 left위치값:",posLeft);
        //2.메뉴배경 보이기 +위치값 주기
        mbg.style.opacity="1";
        mbg.style.left=posLeft+'px';
        
        //오버시 주황색이 박스크기에 맞추기
        let boxWidth=this.offsetWidth;
        mbg.style.width=boxWidth+'px';
        
    }
    function outFn(){
        // console.log("아웃:",this);
        mbg.style.opacity="0";
    }
    
    