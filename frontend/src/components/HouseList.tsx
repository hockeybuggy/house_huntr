import * as React from "react";
import classNames from "classnames";

import { House, HouseId } from "./../types";
import { ActionTypes, LocationActions } from "./../state/actions";

interface HouseListItemProps {
  highlightHouse: () => void;
  selectHouse: () => void;
  clearHighlightedHouse: () => void;
  house: House;
  isSelected: boolean;
}

const HouseListItem = (props: HouseListItemProps) => (
  <li
    className={classNames("house-list-item", {
      "house-list-item--selected": props.isSelected,
    })}
  >
    <a
      onMouseEnter={() => props.highlightHouse()}
      onMouseLeave={() => props.clearHighlightedHouse()}
      onClick={() => props.selectHouse()}
    >
      {props.house.address.streetName}
    </a>
  </li>
);

export interface HouseListProps {
  houses: Map<HouseId, House>;
  dispatch: React.Dispatch<ActionTypes>;
  selectedHouseId: HouseId;
}
export const HouseList = (props: HouseListProps) => (
  <div className="house-list-container">
    <ul className="house-list">
      {Array.from<House>(props.houses.values()).map(house => (
        <HouseListItem
          key={house.id}
          house={house}
          isSelected={props.selectedHouseId === house.id}
          selectHouse={() =>
            props.dispatch({
              type: LocationActions.SelectHouse,
              houseId: house.id,
            })
          }
          highlightHouse={() =>
            props.dispatch({
              type: LocationActions.HighlightHouse,
              houseId: house.id,
            })
          }
          clearHighlightedHouse={() =>
            props.dispatch({
              type: LocationActions.HighlightHouse,
              houseId: null,
            })
          }
        />
      ))}
    </ul>
  </div>
);
