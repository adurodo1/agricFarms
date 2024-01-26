import { useEffect, useRef, useState } from "react";
import "./Slider.css";

const Slider = ({ featureTableContainer }: any) => {
  const checkboxEle = document.getElementById("checkboxId");
  const labelText = document.getElementById("labelText");

  const [label, setLabel] = useState<any>();

  const [checkValue, setCheckValue] = useState<boolean>(true);

  const tempRef = useRef(featureTableContainer);
  let tempdiv = document.getElementsByClassName("table-container")[0];
  //tempRef.current = featureTableContainer.current;

  console.log(featureTableContainer);

  function toggleFeatureTable(target: any) {
    // Check if the table is displayed, if so, toggle off. If not, display.

    if (!target.checked) {
      console.log(checkValue);
      // document.getElementsByClassName("table-container")[0].remove();

      //featureTableContainer.current = "";
      if (featureTableContainer.current !== undefined)
        featureTableContainer.current.style.display = "none";
      setCheckValue(false);
      setLabel("Hide Feature Table");
    } else {
      // featureTableContainer.current = tempRef.current;
      if (featureTableContainer.current !== undefined)
        featureTableContainer.current.style.display = "flex";
      console.log(checkValue);
      setCheckValue(true);
      setLabel("Show Feature Table");
    }
  }

  useEffect(() => {
    console.log(featureTableContainer);
    /*     if (checkValue === true)
      if (featureTableContainer.current !== undefined)
        featureTableContainer.current.style.display = "none";
      else {
        if (featureTableContainer.current !== undefined)
          featureTableContainer.current.style.display = "flex";
      } */
  }, [checkValue]);

  return (
    <>
      <div className="esri-widget slideiv">
        <label className="switch">
          <input
            checked={checkValue}
            id="checkboxId"
            type="checkbox"
            className="yes"
            onChange={(e) => toggleFeatureTable(e.target)}
          />
          <span className="slider round"></span>
        </label>
        <label className="labelText" id="labelText">
          {label}
        </label>
      </div>
    </>
  );
};

export default Slider;
