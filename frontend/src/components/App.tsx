import * as React from "react";

import { Map } from "./Map";
import { Locateable } from "./../types";

import "./../app.css";

const houses = [
  {
    type: "house",
    location: {
      x: 10.0,
      y: 10.0,
    },
    num_bedrooms: 4,
    num_bathrooms: 2,
  },
  {
    type: "house",
    location: {
      x: 20.0,
      y: 20.0,
    },
    num_bedrooms: 3,
    num_bathrooms: 1,
  },
];

const schools = [
  {
    type: "school",
    location: {
      x: 30.0,
      y: 30.0,
    },
  },
];

export const App = (props: {}) => {
  const locations = (houses as Array<Locateable>).concat(
    schools as Array<Locateable>
  );
  return (
    <div>
      <h1>House huntr</h1>

      <Map locations={locations} />
    </div>
  );
};
