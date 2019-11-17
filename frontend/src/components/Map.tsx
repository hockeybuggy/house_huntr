import * as React from "react";

import { LocationTypes, Locateable } from "./../types";
import { MapLocation } from "./MapLocation";

export interface MapProps {
  locations: Array<Locateable>;
}

export const Map = (props: MapProps) => (
  <div className="map-outer-container">
    <div className="map-container">
      {props.locations.map((loc, i) => (
        <MapLocation
          key={i}
          type={loc.type}
          x={loc.location.x}
          y={loc.location.y}
        />
      ))}
    </div>
  </div>
);
