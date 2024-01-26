import React, { useEffect, useMemo, useRef, useState } from "react";
import LayerList from "@arcgis/core/widgets/LayerList";

import Map from "@arcgis/core/Map.js";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";

import GroupLayer from "@arcgis/core/layers/GroupLayer.js";
import * as reactiveUtils from "@arcgis/core/core/reactiveUtils.js";
import esriConfig from "@arcgis/core/config";

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
import { title } from "process";
import { setupMap } from "./utilities/helper";
import MyCalcite from "./MyCalcite";
import Slider from "./utilities/Slider";
import MyLayerList from "./utilities/MyLayerList";

setAssetPath("https://unpkg.com/@esri/calcite-components/dist/calcite/assets");

esriConfig.apiKey = process.env.REACT_APP_ESRI_KEY as string;

const mapStyle = {
  width: "100%",
  height: "100%",
  padding: 0,
  margin: 0,
  Position: "absolute",
  right: 0,
};

function App() {
  //Refs
  const mapRef = useRef<any>();
  const layerContainer = useRef<any>();
  const tableContainer = useRef<any>();

  /*   const [displayTable, setDisplayTable] = useState<any>(); */
  console.log("Rendered");

  //Layers
  //Cattle 2004 to 2022
  let G1 = new GroupLayer();
  G1.title = "Cattle";
  let map = new Map({
    basemap: "streets-vector",
  });

  //addLayersToMap(G1, map);

  setupMap(map);

  /*   let featureTable = new FeatureTable({
    // visible: false,
    multiSortEnabled: true,
    visibleElements: { selectionColumn: true }, // hide the selection column since we are not working with a corresponding map
    container: tableContainer.current,
    // layer: displayTable,

    view: view,
  });
 */
  async function defineActions(event: any) {
    // The event object contains an item property.
    // is is a ListItem referencing the associated layer
    // and other properties. You can control the visibility of the
    // item, its title, and actions using this object.

    const item = event.item;

    await item.layer.when();

    // An array of objects defining actions to place in the LayerList.
    // By making this array two-dimensional, you can separate similar
    // actions into separate groups with a breaking line.

    if (item.layer.type !== "group") {
      item.actionsSections = [
        [
          {
            title: "Go to full extent",
            className: "esri-icon-zoom-out-fixed",
            id: "full-extent",
          },
          {
            title: "Open attribbute table",
            className: "esri-icon-up",
            id: "attribute-table",
          },

          {
            title: "Layer information",
            className: "esri-icon-description",
            id: "information",
          },
        ],

        [
          {
            title: "Increase opacity",
            className: "esri-icon-up",
            id: "increase-opacity",
          },
          {
            title: "Decrease opacity",
            className: "esri-icon-down",
            id: "decrease-opacity",
          },
        ],
      ];
    }
  }

  let view = new MapView({
    map: map,
    zoom: 7,
    popupEnabled: true,
    center: [-79.347015, 43.65107],
  });

  useEffect(() => {
    view.container = mapRef.current;

    let activeWidget: any;
    reactiveUtils.watch(
      // getValue function
      () => view.updating,

      (updating) => {
        const handleActionBarClick = async ({ target }: any) => {
          if (target.tagName !== "CALCITE-ACTION") {
            return;
          }

          if (activeWidget) {
            let aWDataAction: any = document.querySelector(
              `[data-action-id=${activeWidget}]`
            );
            aWDataAction.active = true;
            let aWDataPanel: any = document.querySelector(
              `[data-panel-id=${activeWidget}]`
            );
            aWDataPanel.hidden = false;
          }

          const nextWidget = target.dataset.actionId;
          if (nextWidget !== activeWidget) {
            let nWDataAction: any = document.querySelector(
              `[data-action-id=${nextWidget}]`
            );
            nWDataAction.active = true;
            let nWDataPanel: any = document.querySelector(
              `[data-panel-id=${nextWidget}]`
            );
            nWDataPanel.hidden = false;
            activeWidget = nextWidget;
          } else {
            activeWidget = null;
          }
        };

        document
          .querySelector("calcite-action-bar")
          ?.addEventListener("click", handleActionBarClick);

        //LayerList events
      }
    );
  }, []);

  return (
    <>
      <MyCalcite
        layerContainer={layerContainer}
        tableContainer={tableContainer}
      >
        <div className="map-container" ref={mapRef} style={mapStyle} />
        <MyLayerList
          view={view}
          defineActions={defineActions}
          layerContainer={layerContainer}
          tableContainer={tableContainer}
        />{" "}
      </MyCalcite>
    </>
  );
}

export default App;
