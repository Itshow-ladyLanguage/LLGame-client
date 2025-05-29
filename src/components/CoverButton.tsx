import React from "react";
import CoverButtonDesign from "../assi/CoverButtonDesign";
import { useNavigate } from "react-router-dom";

export default function CoverButton() {
    const navigate = useNavigate(); 
    return (
        <div style={{ justifyContent: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "38px" }}>
            <div>
                <div>
                <CoverButtonDesign label="시작하기" onClick={() => navigate("/login")}/> 
                
                </div>
            </div>
            <div>
                <CoverButtonDesign label="랭킹" onClick={() => navigate("/RankingPages")}/>
                </div>
            </div>
    );
}
