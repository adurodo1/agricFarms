import { useEffect, useRef } from "react";
import FeatureTable from "@arcgis/core/widgets/FeatureTable.js";

const TableStyle = {
  width: "100%",
  height: "400px",
  padding: 0,
  margin: 0,
  bottom: 0,
  zIndex: 999999,
  Position: "fixed",
};

const MyFeatureTable = ({ displayTable, tableContainer }: any) => {
  //const tableContainer = useRef<any>();
  const f = useRef<any>();
  let featureTable: FeatureTable;

  async function main() {
    // if (featureTable) featureTable.destroy();
    f.current = new FeatureTable({
      // visible: false,
      multiSortEnabled: true,
      visibleElements: { selectionColumn: true }, // hide the selection column since we are not working with a corresponding map
      container: tableContainer.current,
      // layer: await displayTable,

      //view: view,
    });
  }

  async function updateTable() {
    console.log(featureTable);
    if (f.current) {
      console.log("sdfsdfsdf");
      f.current.layer = await displayTable;
    }
  }
  useEffect(() => {
    main();
  }, []);

  useEffect(() => {
    updateTable();
  }, [displayTable]);

  return (
    <div style={{ position: "relative", zIndex: 999999999 }}>
      <div style={TableStyle} ref={tableContainer}></div>
    </div>
  );
};

export default MyFeatureTable;
