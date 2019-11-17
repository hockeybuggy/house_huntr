import * as React from "react";

import { Map } from "./Map";
import { Locateable } from "./../types";
import { houseFactory, schoolFactory } from "./../factories";

import "./../app.css";

const NUMBER_OF_HOUSES = 31;
const NUMBER_OF_SCHOOLS = 3;

const houses = Array.from(Array(NUMBER_OF_HOUSES).keys()).map(() =>
  houseFactory({})
);

const schools = Array.from(Array(NUMBER_OF_SCHOOLS).keys()).map(() =>
  schoolFactory({})
);

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
