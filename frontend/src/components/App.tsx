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

  const [selectedHouseId, setSelectedHouseId] = useState<HouseId | null>(null);
  const [highlightedHouseId, setHighlightedHouseId] = useState<HouseId | null>(
    null
  );

  const selectHouse = (id: HouseId): void => {
    setSelectedHouseId(id);
  };

  const highlightHouse = (id: HouseId): void => {
    setHighlightedHouseId(id);
  };

  const locations = (houses as Array<Locateable>).concat(
    schools as Array<Locateable>
  );

  // TODO This isn't efficent to loop through the list like this. It would be
  // better to structure "houses" as an indexable collection.
  const selectedHouse: null | House =
    houses.find(h => h.id === selectedHouseId) || null;

  return (
    <div className="app-container">
      <Header />
      <Controls
        constraints={state.controls.constraints}
        editingId={state.controls.editingId}
        dispatch={dispatch}
      />

      <WorldMap
        locations={locations}
        selectedHouseId={selectedHouseId}
        highlightedHouseId={highlightedHouseId}
      />

      <div className="houses-container">
        <SelectedHouseDetails
          clearSelected={setSelectedHouseId.bind(null)}
          selectedHouse={selectedHouse}
        />

        <HouseList
          houses={houses}
          selectHouse={selectHouse}
          selectedHouseId={selectedHouseId}
          highlightHouse={highlightHouse}
        />
      </div>
    </div>
  );
};
