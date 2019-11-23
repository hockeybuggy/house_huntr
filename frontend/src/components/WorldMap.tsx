import * as React from "react";

import {
  House,
  HouseId,
  Locateable,
  LocationTypes,
  School,
  SchoolId,
} from "./../types";

export interface WorldMapProps {
  houses: Map<HouseId, House>;
  schools: Map<SchoolId, School>;
  selectedHouseId: HouseId | null;
  highlightedHouseId: HouseId | null;
}

export const WorldMap = (props: WorldMapProps) => {
  const locations: Array<Locateable> = (Array.from(
    props.houses.values()
  ) as Array<Locateable>).concat(Array.from(props.schools.values()));

  return (
    <div className="map-outer-container">
      <div className="map-container">
        {locations.map((loc, i) => (
          <WorldMapLocation
            key={i}
            type={loc.type}
            selected={(loc as House).id === props.selectedHouseId}
            highlighted={(loc as House).id === props.highlightedHouseId}
            x={loc.location.x}
            y={loc.location.y}
          />
        ))}
      </div>
    </div>
  );
};

interface WorldMapLocationProps {
  type: LocationTypes;
  selected: boolean;
  highlighted: boolean;
  x: number;
  y: number;
}

function getColorForLocationType(type: LocationTypes): string {
  switch (type) {
    case "house":
      return "green";
    case "school":
      return "blue";
  }
  throw Error(`Non exaustive match for location color ${type}`);
}

export const WorldMapLocation = (props: WorldMapLocationProps) => {
  let color = getColorForLocationType(props.type);

  if (props.highlighted) {
    color = "orange";
  }
  if (props.selected) {
    color = "red";
  }

  return (
    <div
      className="map-location"
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
        backgroundColor: color,
      }}
    ></div>
  );
};
