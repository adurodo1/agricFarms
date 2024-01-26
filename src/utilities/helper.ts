import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Map from "@arcgis/core/Map.js";
import GroupLayer from "@arcgis/core/layers/GroupLayer.js";

const cattleGroup = new GroupLayer();
cattleGroup.title = "Cattle";

//add cattle layers
const cattleGroupFeatureUrlList = [
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/Cattle_2004_to_2022/FeatureServer",
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
];

cattleGroupFeatureUrlList.forEach((url) => {
  if (
    url ===
    "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer"
  ) {
    cattleGroup.add(
      new FeatureLayer({
        url: url,
        definitionExpression: "busdesc like '%Cattle%'",
      })
    );
  } else {
    console.log(url);
    {
      cattleGroup.add(
        new FeatureLayer({
          url: url,
        })
      );
    }
  }
});

//add horser layer

const HorsesGroup = new GroupLayer();
HorsesGroup.title = "Horses";

const HorseGroupFeatureUrlList = [
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
  " https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/2021_Census_of_Agriculture_by_CSD/FeatureServer",
];

HorseGroupFeatureUrlList.forEach((url) => {
  if (
    url ===
    "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer"
  ) {
    HorsesGroup.add(
      new FeatureLayer({
        url: url,
        definitionExpression: "busdesc like '%Horses%'",
      })
    );
  } else {
    {
      HorsesGroup.add(
        new FeatureLayer({
          url: url,
          visible: false,
        })
      );
    }
  }
});

//add Pigs layer

const PigsGroup = new GroupLayer();
PigsGroup.title = "Pigs";

const PigsGroupFeatureUrlList = [
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/Total_Pigs_2004_to_2022/FeatureServer",
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
];

PigsGroupFeatureUrlList.forEach((url) => {
  if (
    url ===
    "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer"
  ) {
    PigsGroup.add(
      new FeatureLayer({
        url: url,
        definitionExpression: "busdesc like '%Pig%'",
      })
    );
  } else {
    {
      PigsGroup.add(
        new FeatureLayer({
          url: url,
          visible: false,
        })
      );
    }
  }
});

//add Poultry layer

const PoultryGroup = new GroupLayer();
PoultryGroup.title = "Poultry";

const PoultryGroupFeatureUrlList = [
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/2021_Census_of_Agriculture_by_CSD/FeatureServer",
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
  "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/2021_Census_of_Agriculture_by_CSD/FeatureServer",
];

PoultryGroupFeatureUrlList.forEach((url) => {
  if (
    url ===
    "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer"
  ) {
    PoultryGroup.add(
      new FeatureLayer({
        url: url,
        definitionExpression: "busdesc like '%Poultry%'",
      })
    );
  } else {
    {
      PoultryGroup.add(
        new FeatureLayer({
          url: url,
          visible: false,
        })
      );
    }
  }
});

//

function createGroupThenAdd(title: any, list: any, isconnectON: boolean) {
  const tempGroup = new GroupLayer();
  tempGroup.title = title;

  if (isconnectON) {
    tempGroup.add(
      new FeatureLayer({
        url: "https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/AnimalProduction_NAICS112_ConnectON/FeatureServer",
        definitionExpression: `busdesc like '%${title}%'`,
      })
    );
  }
  list.forEach((url: any) => {
    tempGroup.add(
      new FeatureLayer({
        url: url,
        visible: false,
      })
    );
  });

  return tempGroup;
}

let groupLayerArray: Array<any> = [];

export async function setupMap(map: Map) {
  map.add(cattleGroup);
  map.add(HorsesGroup);
  map.add(PigsGroup);
  map.add(PoultryGroup);
}
