import React from "react";


export default function SuccessCheckmark(){
    // by https://codepen.io/cvan/pen/LYYXzWZ
    return (
        <div className="successCheckmark">
            <div className="checkIcon">
                <span className="iconLine lineTip"></span>
                <span className="iconLine lineLong"></span>
            </div>

            <div style={{marginTop: 10}}>
                <span>성공하였습니다.</span>
            </div>
        </div>
    )

}