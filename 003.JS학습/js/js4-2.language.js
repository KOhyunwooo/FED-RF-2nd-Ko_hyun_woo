//JS4-2.객체연습_다국어 JS

//나의 함수 불러오기
import mFn from './my_function.js'

/* 제이슨 데이터 불러오기 */
import langData from './data_lang.json' with {type:'json'};

//1. 다국어 요구사항
//-언어 선택박스에서 언어를 변경하면 코드에 맞게 다국어 데이터를
//제이슨 파일에서 읽어와 본 페이지의 해당 데이터를 업데이트 한다.

//2. 대상선정
//2-1. 이벤트 대상: .sel
const selBox = mFn.qs('.sel');
//2-2. 변경대상: #gnb a/ #cont img/ #info adress
//(1)gnb메뉴:#gnb a 
const gnbList=mFn.qsa('#gnb a');
//(2)메인이미지:#cont img
const mainImg = mFn.qs('#cont-img');

//(3)하단주소:#info adress
const addrBox =mFn.qs('#info address');

///3.이벤트 설정하기/////
//이벤트 종류: 선택박스가 변경될떄 발생하는 이벤트는? change
mFn.addEvt(selBox,'change',chgLang);

//4.함수 만들기//////
function chgLang(){
    //1.선택된 option의 value속성값
    let optVal=this.value;
    //2.읽어온 option의 value값으로 다국어 객체값 매칭하기
    let selLang=langData[optVal];
    
    //호출 및 값 확인
    console.log('변경',optVal,selLang)

    //3.데이터 셋팅하기///////////
    //3-1. GNB메뉴 셋팅하기
    gnbList.forEach((ele,idx)=>{
        ele.innerText=selLang['메뉴'][idx];

    });///////forEach/////////////////

    //3-2.메인 이미지 src값 변경하기
    //각 경로의 이미지명은 다국어 코드명으로 되어있음
    mainImg.src=`images/${optVal}.jpg`;

    //3-3.회사주소 데이터 변경하기
    addrBox.innerText=selLang['회사주소'];
}/////////////chgLang함수/////////////////////////