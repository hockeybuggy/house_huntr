import * as React from "react";

import "./../app.css";

import { Locateable } from "./../types";
import { houseFactory, schoolFactory } from "./../factories";

import { Map } from "./Map";
import { Header } from "./Header";
import { HouseList } from "./HouseList";
import { Controls } from "./Controls";

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
    <div className="app-container">
      <Header />
      <Controls />

      <Map locations={locations} />

      <HouseList houses={houses} />
    </div>
  );
};
