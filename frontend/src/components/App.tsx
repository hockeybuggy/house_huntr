import React, { useReducer, useEffect, useState } from "react";

import "./../app.css";

import { House, School } from "./../types";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      getLocations().then(
        (result: { houses: Array<House>; schools: Array<School> }) => {
          setIsLoading(true);
          dispatch({ type: LocationActions.SetHouses, houses: result.houses });
          dispatch({
            type: LocationActions.SetSchools,
            schools: result.schools,
          });
        }
      );
    },
    [] // causes the effect to be triggered once
  );

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
        highlightedHouseId={state.locations.highlightedHouseId}
      />

      <div className="houses-container">
        <SelectedHouseDetails
          selectedHouse={state.locations.houses.get(
            state.locations.selectedHouseId
          )}
          dispatch={dispatch}
        />
        {isLoading ? (
          <HouseList
            houses={state.locations.houses}
            selectedHouseId={state.locations.selectedHouseId}
            dispatch={dispatch}
          />
        ) : (
          <div>
            <h2>loading</h2>
          </div>
        )}
      </div>
    </div>
  );
};
