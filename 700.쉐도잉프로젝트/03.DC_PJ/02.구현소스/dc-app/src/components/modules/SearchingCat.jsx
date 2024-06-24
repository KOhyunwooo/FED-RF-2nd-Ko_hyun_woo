import React from "react";

// css불러오기
import "../../css/searching_cat.scss";
import { Link } from "react-router-dom";

function SearchingCat({ dt }) {
    //()안은 값을 받을내용들
    //dt-검색된 배열데이터
    //total-검색된 배열데이터 개수
    const total = dt.length;
    console.log("데이터수:",total);

    return (
        <>
            {
                //데이터 개수가 0이 아닐때 출력////////////////
                total > 0 && (
                    <ul className="clist">
                        {dt.map((v, i) => (
                            <li key={i}>
                                {/* state로 3가지 값을 넘겨준다 */}
                                <Link
                                    to="/detail"
                                    state={{
                                        cname: v.cname, // 캐릭터 이름
                                        cdesc: v.cdesc, // 캐릭터 설명
                                        facts: v.facts, // 캐릭터 상세
                                        itx: v.itx, //임시
                                    }}
                                ></Link>
                                <img src={process.env.PUBLIC_URL+v.tmsrc} alt={v.cname} />
                                <h3>{v.cname}</h3>
                            </li>
                        ))}
                    </ul>
                )
            }
            {
                //선택데이터가 0개면 아래 출력////////////////
                total == 0 && (
                    <h2 style={{ textAlign: "center" }}>
                        Sorry, we don't have any matches for that. But there's
                        plenty more to see on DC!
                    </h2>
                )
            }
        </>
    );
}

export default SearchingCat;
