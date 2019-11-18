import * as React from "react";

import { House } from "./../types";

interface SelectedHouseDetailsProps {
  selectedHouse: House | null;
  clearSelected: () => void;
}

export const SelectedHouseDetails = (props: SelectedHouseDetailsProps) => {
  return props.selectedHouse ? <HouseDetails {...props} /> : <EmptyState />;
};

interface HouseDetailsProps extends SelectedHouseDetailsProps {
  selectedHouse: House;
}

export const HouseDetails = (props: HouseDetailsProps) => (
  <div className="selected-house-details-container">
    <button aria-label="close" onClick={props.clearSelected}>
      Clear selection
    </button>
    <h3>{props.selectedHouse.address.streetName}</h3>
    <p>
      <strong>{"Number of bedrooms:"}</strong>
      {props.selectedHouse.num_bedrooms}
    </p>
    <p>
      <strong>{"Number of bathrooms:"}</strong>
      {props.selectedHouse.num_bathrooms}
    </p>
  </div>
);

const EmptyState = (props: {}) => (
  <div className="selected-house-details-container">
    <p>Nothing selected. Choose an option from the list below:</p>
  </div>
);
