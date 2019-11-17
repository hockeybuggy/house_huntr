import * as React from "react";

import { Map } from "./Map";
import { Locateable } from "./../types";
import { houseFactory } from "./../factories";

import "./../app.css";

const NUMBER_OF_HOUSES = 10;

const houses = Array.from(Array(NUMBER_OF_HOUSES).keys()).map(() =>
  houseFactory({})
);

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
