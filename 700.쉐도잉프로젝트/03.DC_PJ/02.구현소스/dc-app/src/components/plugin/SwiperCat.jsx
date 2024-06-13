// 스와이퍼 플러그인 컴포넌트

import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// 제이쿼리 불러오기
import $ from "jquery";

// 데이터 불러오기

import { catListData } from "../data/swiper_cat";

// Import Swiper styles : 모듈용기본 css파일 로딩
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 스와이퍼 비디오 모듈 css: 내가 작성한 css
import "./css/swiper_cat.scss";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// 여기서는 네비게이션(양쪽화살표)만 사용
import { Navigation } from "swiper/modules";

export function SwiperCat() {
    //선택데이터 변수할당
    const selData = catListData;

    return (
        <>
            <Swiper
                // slidesPerView={4}
                spaceBetween={20}
                loop={false}
                navigation={true}
                /* 사용할 모듈을 여기에 적용시킨다 */

                // 스와이퍼 사이즈별 슬라이드수 변경!
                breakpoints={{
                    200: {
                        slidesPerView: 3,
                    },
                    700: {
                        slidesPerView: 4,
                    },
                    1000: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 7,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper2"
            >
                {selData.map(
                    (v, i) =>
                        /* idx 고유번호가 7번 이하만 출력 */
                        //v.idx를 Number로 싸고 &&뒤에 한덩어리 바로실행
                        //idx가 문자형 숫자 이므로 비교를 위해 숫자형 변환해줌! Number(변수)
                        Number(v.idx) <= 7 && ( // v.dix고유번호가 7번 이하면 출력
                            <SwiperSlide key={i}>
                                <section className="sw-inbox2">
                                    {/* 캐릭터이미지영역 */}
                                    <div className="cat-img2">
                                        <img src={v.tmsrc} alt={v.cname} />

                                    </div>
                                    {/* 캐릭터타이틀영역 */}
                                    <div className="cat-tit2">
                                        <h3>{v.cname}</h3>
                                    </div>
                                </section>
                            </SwiperSlide>
                        )
                )}
            </Swiper>
        </>
    );
} /////////// SwiperCat 컴포넌트 ///////////
