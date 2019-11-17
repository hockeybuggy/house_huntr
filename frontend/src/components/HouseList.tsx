import * as React from "react";
import classNames from "classnames";

import { House, HouseId } from "./../types";

interface HouseListItemProps {
  selectHouse: () => void;
  house: House;
  isSelected: boolean;
}

const HouseListItem = (props: HouseListItemProps) => (
  <li
    className={classNames("house-list-item", {
      "house-list-item--selected": props.isSelected,
    })}
  >
    <div onClick={() => props.selectHouse()}>{props.house.type}</div>
  </li>
);

interface HouseListProps {
  houses: Array<House>;
  selectHouse: (id: HouseId) => void;
  selectedHouseId: HouseId;
}
export const HouseList = (props: HouseListProps) => (
  <div className="house-list-container">
    <ul className="house-list-container">
      {props.houses.map(house => (
        <HouseListItem
          key={house.id}
          house={house}
          selectHouse={() => props.selectHouse(house.id)}
          isSelected={props.selectedHouseId === house.id}
        />
      ))}
    </ul>
  </div>
);
