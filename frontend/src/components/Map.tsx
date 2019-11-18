import * as React from "react";

import { House, HouseId, LocationTypes, Locateable } from "./../types";

export interface MapProps {
  locations: Array<Locateable>;
  selectedHouseId: HouseId | null;
  highlightedHouseId: HouseId | null;
}

export const Map = (props: MapProps) => (
  <div className="map-outer-container">
    <div className="map-container">
      {props.locations.map((loc, i) => (
        <MapLocation
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

interface MapLocationProps {
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

export const MapLocation = (props: MapLocationProps) => {
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
