import React from "react";


export default function SuccessCheckmark(){
    // by https://codepen.io/cvan/pen/LYYXzWZ
    return (
        <div className="successCheckmark">
            <div className="checkIcon">
                <span className="iconLine lineTip"></span>
                <span className="iconLine lineLong"></span>
            </div>

            <div >
                <span>인증 되었습니다.</span>
            </div>
        </div>
    )

}