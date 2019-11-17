import * as React from "react";

import { House } from "./../types";

interface SelectedHouseDetailsProps {
  selectedHouse: null | House;
  clearSelected: () => void;
}

export const SelectedHouseDetails = (props: SelectedHouseDetailsProps) => {
  if (!props.selectedHouse) {
    return null;
  }
  const house = props.selectedHouse;
  return (
    <div className="selected-house-details-container">
      <h3>{house.id}</h3>
      <a onClick={props.clearSelected}>clear</a>
    </div>
  );
};
