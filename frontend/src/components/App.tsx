import React, { useReducer, useState } from "react";

import "./../app.css";

import { House, HouseId, Locateable } from "./../types";
import { houseFactory, schoolFactory } from "./../factories";

import { Controls } from "./Controls";
import { Header } from "./Header";
import { HouseList } from "./HouseList";
import { WorldMap } from "./WorldMap";
import { SelectedHouseDetails } from "./SelectedHouseDetails";

import { reducer, initializeState } from "./../state/reducers";

const NUMBER_OF_HOUSES = 31;
const NUMBER_OF_SCHOOLS = 3;

const houses = Array.from(Array(NUMBER_OF_HOUSES).keys()).map(() =>
  houseFactory({})
);

const schools = Array.from(Array(NUMBER_OF_SCHOOLS).keys()).map(() =>
  schoolFactory({})
);

export const App = (props: {}) => {
  const [state, dispatch] = useReducer(reducer, null, initializeState);

  const [highlightedHouseId, setHighlightedHouseId] = useState<HouseId | null>(
    null
  );

  const highlightHouse = (id: HouseId): void => {
    setHighlightedHouseId(id);
  };

  return (
    <div className="app-container">
      <Header />
      <Controls
        constraints={state.controls.constraints}
        editingId={state.controls.editingId}
        dispatch={dispatch}
      />

      <WorldMap
        houses={state.locations.houses}
        schools={state.locations.schools}
        selectedHouseId={state.locations.selectedHouseId}
        highlightedHouseId={highlightedHouseId}
      />

      <div className="houses-container">
        <SelectedHouseDetails
          selectedHouse={state.locations.houses.get(
            state.locations.selectedHouseId
          )}
          dispatch={dispatch}
        />

        <HouseList
          houses={state.locations.houses}
          selectedHouseId={state.locations.selectedHouseId}
          highlightHouse={highlightHouse}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
};
