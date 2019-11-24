import React from "react";

import {
  House,
  HouseId,
  Locateable,
  LocationTypes,
  School,
  SchoolId,
} from "./../types";
import { ActionTypes, LocationActions } from "./../state/actions";

export interface WorldMapProps {
  dispatch: React.Dispatch<ActionTypes>;
  houses: Map<HouseId, House>;
  schools: Map<SchoolId, School>;
  excludedHouses: Set<HouseId>;
  selectedHouseId: HouseId | null;
  highlightedHouseId: HouseId | null;
}

export const WorldMap = (props: WorldMapProps) => {
  const locations: Array<Locateable> = (Array.from(
    props.houses.values()
  ) as Array<Locateable>).concat(Array.from(props.schools.values()));

  return (
    <div className="map-outer-container">
      <div className="map-container">
        {locations.map((loc, i) => (
          <WorldMapLocation
            key={i}
            type={loc.type}
            disabled={props.excludedHouses.has((loc as House).id)}
            selected={(loc as House).id === props.selectedHouseId}
            highlighted={(loc as House).id === props.highlightedHouseId}
            setHighlight={() =>
              props.dispatch({
                type: LocationActions.HighlightHouse,
                houseId: (loc as House).id,
              })
            }
            clearHighlight={() =>
              props.dispatch({
                type: LocationActions.HighlightHouse,
                houseId: null,
              })
            }
            setSelected={() =>
              props.dispatch({
                type: LocationActions.SelectHouse,
                houseId: (loc as House).id,
              })
            }
            x={loc.location.x}
            y={loc.location.y}
          />
        ))}
      </div>
    </div>
  );
};

function getColorForLocationType(type: LocationTypes): string {
  switch (type) {
    case "house":
      return "green";
    case "school":
      return "blue";
  }
  throw Error(`Non exaustive match for location color ${type}`);
}

interface WorldMapLocationProps {
  type: LocationTypes;
  disabled: boolean;
  selected: boolean;
  highlighted: boolean;
  setHighlight: () => void;
  clearHighlight: () => void;
  setSelected: () => void;
  x: number;
  y: number;
}

export const WorldMapLocation = (props: WorldMapLocationProps) => {
  let color = getColorForLocationType(props.type);

  if (props.disabled) {
    color = "grey";
  }
  if (props.highlighted) {
    color = "orange";
  }
  if (props.selected) {
    color = "red";
  }

  const noop = () => {};
  const onMouseEnter = props.disabled ? noop : () => props.setHighlight();
  const onMouseLeave = props.disabled ? noop : () => props.clearHighlight();
  const onClick = props.disabled ? noop : () => props.setSelected();

  return (
    <a
      className="map-location"
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
        backgroundColor: color,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    ></a>
  );
};
