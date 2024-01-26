import LayerList from "@arcgis/core/widgets/LayerList";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";
import { useEffect, useState } from "react";
import MyFeatureTable from "./MyFeatureTable";

const TableStyle = {
  width: "100%",
  height: "400px",
  padding: 0,
  margin: 0,
  bottom: 0,
  zIndex: 999999,
  Position: "sticky",
};
const MyLayerList = ({
  view,

  defineActions,
  layerContainer,
  tableContainer,
}: any) => {
  const [displayTable, setDisplayTable] = useState<any>();

  async function main() {
    const layerList = new LayerList({
      view: await view,
      selectionEnabled: true,
      container: layerContainer.current,
      listItemCreatedFunction: defineActions,
    });

    console.log(view);
    layerList.on("trigger-action", (event) => {
      // The layer visible in the view at the time of the trigger.
      //const visibleLayer = USALayer.visible ? USALayer : censusLayer;

      const visibleLayer: any = event.item.layer;
      const id = event.action.id;
      console.log(visibleLayer);

      if (id === "full-extent") {
        view.goTo(visibleLayer.fullExtent);
      } else if (id === "information") {
        window.open(visibleLayer.url);
      } else if (id === "increase-opacity") {
        if (visibleLayer.opacity < 1) {
          visibleLayer.opacity += 0.25;
        }
      } else if (id === "decrease-opacity") {
        if (visibleLayer.opacity > 0) {
          visibleLayer.opacity -= 0.25;
        }
      } else if (id === "attribute-table") {
        setDisplayTable(() => visibleLayer);
        let featureTable = new FeatureTable({
          // visible: false,
          multiSortEnabled: true,
          visibleElements: { selectionColumn: true }, // hide the selection column since we are not working with a corresponding map
          container: tableContainer.current,
          layer: visibleLayer,

          //view: view,
        });
        featureTable.visible = true;

        // featureTable.layer = visibleLayer;
      }
    });

    return layerList;
  }

  useEffect(() => {
    async function SetupAndRemoveListener() {
      let listlistener = await main();
      return listlistener;
    }

    let listener = SetupAndRemoveListener();
    return () => {
      listener.then((res) => {
        res.removeHandles("trigger-action");
      });
    };
  }, []);

  return (
    <div>
      {displayTable ? (
        <MyFeatureTable
          displayTable={displayTable}
          tableContainer={tableContainer}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MyLayerList;
