import * as React from "react";

import { LocationTypes } from "./../types";

interface MapLocationProps {
  type: LocationTypes;
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

export const MapLocation = (props: MapLocationProps) => (
  <div
    className="map-location"
    style={{
      left: `${props.x}px`,
      top: `${props.y}px`,
      backgroundColor: getColorForLocationType(props.type),
    }}
  ></div>
);
