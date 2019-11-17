import * as React from "react";

import { House } from "./../types";

interface HouseListProps {
  houses: Array<House>;
}
export const HouseList = (props: HouseListProps) => (
  <div className="house-list-container">
    {props.houses.map((house, i) => (
      <div key={i}>{house.type}</div>
    ))}
  </div>
);
