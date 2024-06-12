// 스와이퍼 플러그인 컴포넌트

import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// 제이쿼리 불러오기
import $ from "jquery";

// 데이터 불러오기
import { swVidData } from "../data/swiper_vid";

// Import Swiper styles : 모듈용기본 css파일 로딩
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 폰트어썸 불러오기
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

// 스와이퍼 비디오 모듈 css: 내가 작성한 css
import "./css/swiper_vid.scss";

// import required modules
// 사용할 스와이퍼 모듈을 불러온다
// 여기서는 네비게이션(양쪽화살표)만 사용
import { Navigation } from "swiper/modules";

export function SwiperVid({ catName }) {
    //catName-카테고리명

    //선택데이터 변수할당
    const selData = swVidData[catName];
    // 비디오 보이기 함수////
    const showVideo = (src, tit) => {
        console.log("비디오 보여!", src, tit);

        // 1. 대상선정
        // 1-1. 아이프레임 : .play-vid iframe
        const ifr = $(".play-vid iframe");
        // 1-2. 전체 박스 : .vid-bx
        const vbx = $(".vid-bx");
        // 1-3. 타이틀 박스 : .ifr-tit
        const itit = $(".ifr-tit");
        // 1-4. 닫기 버튼 : .cbtn
        const cbtn = $(".cbtn");

        // 2. 변경하기
        // 2-1.아이프레임 src경로 넣기
        ifr.attr("src", src + "?autoplay=1");
        // 2-2. 비디오 타이틀 넣기
        itit.text(tit);
        // 2-3. 박스보이기
        vbx.fadeIn(300);
        // 2-4. 닫기버튼 세팅
        cbtn.on("click", () => {
            // 전체박스 사라지기
            vbx.fadeOut(300);
            // 기존 동영상 플레이 멈추기(src값 삭제)
            ifr.attr("src", "");
        });
    }; ////showVideo함수///////////

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
                        slidesPerView: 1,
                    },
                    500: {
                        slidesPerView: 2,
                    },
                    1000: {
                        slidesPerView: 3,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                modules={[Navigation]}
                className="mySwiper"
            >
                {selData.map((v, i) => (
                    <SwiperSlide key={i}>
                        <section
                            className="sw-inbox"
                            onClick={() => showVideo(v.vsrc, v.tit)}
                        >
                            {/* 동영상이미지박스 */}
                            <div className="vid-img">
                                <img src={v.isrc} alt={v.tit} />
                                {/* 폰트어썸 아이콘 */}
                                <FontAwesomeIcon
                                    icon={faCirclePlay}
                                    style={{
                                        position: "absolute",
                                        bottom: "55%",
                                        left: "10%",
                                        color: "#fff",
                                        fontSize: "50px",
                                    }}
                                />
                            </div>
                            {/* 동영상 타이틀 박스 */}
                            <div className="vid-tit">
                                <h4>{v.cat}</h4>
                                <h3>{v.tit}</h3>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
} /////////// SwiperApp 컴포넌트 ///////////
