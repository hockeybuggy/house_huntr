import * as React from "react";

import { MapLocation } from "./MapLocation";

const houses = [
  {
    location: {
      x: 10.0,
      y: 10.0,
    },
    num_bedrooms: 4,
    num_bathrooms: 2,
  },
  {
    location: {
      x: 20.0,
      y: 20.0,
    },
    num_bedrooms: 3,
    num_bathrooms: 1,
  },
];

export const Map = (props: {}) => (
  <div className="map-container">
    {houses.map((h, i) => (
      <MapLocation key={i} type={"house"} x={h.location.x} y={h.location.y} />
    ))}
  </div>
);
