import { setAssetPath } from "@esri/calcite-components/dist/components";
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/calcite/calcite.css";
import {
  CalciteShell,
  CalciteShellPanel,
  CalciteActionBar,
  CalciteAction,
  CalcitePanel,
  CalciteBlock,
} from "@esri/calcite-components-react";
import Slider from "./utilities/Slider";
const MyCalcite = ({ layerContainer, tableContainer, children }: any) => {
  return (
    <>
      <CalciteShell content-behind>
        <CalciteShellPanel
          displayMode="float"
          slot="panel-start"
          position="start"
          id="shell-panel-start"
          heightScale="l"
          layout="horizontal"
          draggable={"true"}
        >
          <CalciteActionBar slot="action-bar">
            <CalciteAction
              data-action-id="layers"
              text="Layers"
              icon="layers"
              indicator
            ></CalciteAction>
          </CalciteActionBar>
          <CalcitePanel
            heading="Layers"
            height-scale="l"
            data-panel-id="layers"
            hidden
          >
            {tableContainer ? (
              <Slider featureTableContainer={tableContainer} />
            ) : (
              ""
            )}

            <div ref={layerContainer}></div>
          </CalcitePanel>
        </CalciteShellPanel>
        {children}
      </CalciteShell>
    </>
  );
};

export default MyCalcite;
