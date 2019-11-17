import * as React from "react";

import { House, HouseId } from "./../types";

interface HouseListProps {
  houses: Array<House>;
  selectHouse: (id: HouseId) => void;
}
export const HouseList = (props: HouseListProps) => (
  <div className="house-list-container">
    {props.houses.map((house, i) => (
      <div key={i} onClick={() => props.selectHouse(house.id)}>
        {house.type}
      </div>
    ))}
  </div>
);
