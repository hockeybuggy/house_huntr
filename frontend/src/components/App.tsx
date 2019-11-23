import React, { useReducer, useEffect, useState } from "react";

import "./../app.css";

import { House, HouseId, Locateable, School } from "./../types";
import { getLocations } from "./../clients";

import { Controls } from "./Controls";
import { Header } from "./Header";
import { HouseList } from "./HouseList";
import { WorldMap } from "./WorldMap";
import { SelectedHouseDetails } from "./SelectedHouseDetails";

import { reducer, initializeState } from "./../state/reducers";
import { LocationActions } from "./../state/actions";

export const App = (props: {}) => {
  const [state, dispatch] = useReducer(reducer, null, initializeState);

  useEffect(() => {
    getLocations().then(
      (result: { houses: Array<House>; schools: Array<School> }) => {
        dispatch({ type: LocationActions.SetHouses, houses: result.houses });
        dispatch({ type: LocationActions.SetSchools, schools: result.schools });
      }
    );
  }, []);

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
