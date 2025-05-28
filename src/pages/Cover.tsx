import "./Cover_gradient.css"
import CoverButton from "../components/CoverButton";

export default function Cover() {
  return (
    <div className="Cover_gradient" >
      <div style={ { width: "1350px", height: "459px", justifyContent: "center" }}>
          <img src="/images/Logo.png"/>
      </div>
      <div >
        <div style={{marginTop:"87.5px"}}>
            <CoverButton/>
      </div>
    </div>
    </div>
  );
}
