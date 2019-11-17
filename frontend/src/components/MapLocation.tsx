import * as React from "react";

interface MapLocationProps {
  type: "house" | "school";
  x: number;
  y: number;
}

export const MapLocation = (props: MapLocationProps) => (
  <div
    className="map-location"
    style={{ left: `${props.x}px`, top: `${props.y}px` }}
  ></div>
);
