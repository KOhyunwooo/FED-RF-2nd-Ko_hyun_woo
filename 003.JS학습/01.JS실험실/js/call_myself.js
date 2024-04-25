//08.재귀호출 JS -call_myself.js

import mFn from "./my_function.js";

//초기세팅하기
//대상: .gbox
const gbox = mFn.qs(".gbox");

// 코드변수
let hcode="<ul>";

//for문으로 코드 만들기: ul>li>img
for(let i=1; i<=7; i++){

    hcode += `
        <li>
            <a href="#"><img src="./images/auto_scroll/m${i}.jpg" alt="갤러리 이미지"></a>
        </li>
    `;
}/////for/////

hcode += "</ul>";


//대상에 코드넣기
gbox.innerHTML = hcode;


/////갤러리 박스를 왼쪽으로 계속 움직이게 하는/////////////
/////재귀 호출 함수 만들기///////////////////////////////

// 움직일 대상:.gbox ul
let target=mFn.qsEl(gbox,'ul');

//기준값 업데이트 함수
const updateCriteria = ()=> mFn.qsaEl(target,"li")[0]. offsetWidth;
//기준값 (대상li. 가로크기값)
let criteria = updateCriteria();
//리사이즈시 업데이트
mFn.addEvt(window,"resize",
()=>{criteria = updateCriteria()
     console.log("기준값 업데이트:",criteria);
});

// 현재 translate값
let currVal=0;



function moveGallary(){
    //현재값 1씩감소
    target.style.translate= --currVal+"px";
    // 하나크기만큼 나가면 처리!
    // 기준값을 마이너스로 하고 소수점 아래는 버림
    // Math.floor()소수점 아래 내림(버림) 함수
    if(currVal<=Math.floor(-criteria)){
        // 맨앞li 맨뒤로 이동!
        // appendchild(맨앞li)
        //->맨앞 li는 새로 구해와야함!(계속변경되니까!)
        target.appendChild(mFn.qsaEl(target,"li")[0]);
        //2. translate값 초기화
        target.style.translate="0px";
        //3. 하나 크기만큼 나가면 currVal값 초기화!
        currVal=0;
        
    }///////////if/////////////////////////////
    // 하나 크기만큼 나가면 맨앞li 맨뒤로 이동!
    
    //재귀호출!(타임아웃함수로 호출함!)
    //stopSts변수값이 false일때만 실행하기
    if(!stopSts)
    setTimeout(moveGallary,10);


}/////////moveGallery//////////

// setTimeout(moveGallary,1000);/*moveGallary호출!! 시작 지연 1000=1초 */





//대상에 마우스 오버시 멈추고 아웃시 다시 흘러가게 하기!!//////////////////////////
//대상:.gbox->gbox변수
//멈춤 상태변수
let stopSts=false;

//1.멈추기(mouseenter)
mFn.addEvt(gbox,"mouseenter",()=>{
    //멈춤상태변수 true변경
    stopSts=true;
});
//2.다시흘러가기(mouseleave)
mFn.addEvt(gbox,"mouseleave",()=>{
    //멈춤상태변수 false변경
    stopSts=false;
    //재귀호출함수 호출!
    // moveGallary();
});







///////////////////////////////////////////////////////////////////////////
///프로그래스 바 '퍼센트' 증가하기 재귀호출함수 만들기////
//퍼센트 증가 숫자변수
let percent=0;
// 숫자출력박스: .pNum
const pNum =mFn.qs(".pNum");
// 퍼센트바: .bar
const bar=mFn.qs(".bar");
// 준비글자: .txt
const txt=mFn.qs(".txt");

// 재귀호출함수 만들기
function increasePercent(){
    //1.pNum에 숫자출력
    pNum.innerHTML= ++percent+"%";
    //2.퍼센트바 width값 동시에 증가하기
    bar.style.width=percent+"%";

    //3.증가숫자가 100보다 작을때까지 계속 재귀호출
    if(percent<100)
    {setTimeout(increasePercent,60);}

    else{
    //4.재귀호출이 끝나면 "준비"글자를 "출발!"로 변경
    txt.innerHTML = "출발!"    
    bar.style.backgroundColor ="red";
    //5.슬라이드 이동함수 호출하기(타임아웃호출은 주석)
        moveGallary();
    }//////else/////
}/////increasePercent함수///////'

/* 퍼센트바 호출~ */
increasePercent();