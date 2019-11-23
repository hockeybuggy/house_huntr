import {
  Constraint,
  ConstraintId,
  House,
  HouseId,
  School,
  SchoolId,
} from "./../types";
import { ActionTypes, ConstraintActions, LocationActions } from "./actions";

interface ControlsState {
  editingId: ConstraintId | null;
  constraints: Map<ConstraintId, Constraint>;
}

interface LocationsState {
  houses: Map<HouseId, House>;
  schools: Map<SchoolId, School>;
  selectedHouseId: HouseId | null;
}

interface State {
  controls: ControlsState;
  locations: LocationsState;
}

export function initializeState(): State {
  return {
    controls: {
      editingId: null,
      constraints: new Map(),
    },
    locations: {
      houses: new Map(),
      schools: new Map(),
      selectedHouseId: null,
    },
  };
}

function controlsReducer(
  state: ControlsState,
  action: ActionTypes
): ControlsState {
  switch (action.type) {
    case ConstraintActions.AddConstraint:
      return Object.assign({}, state, {
        editingId: action.constraint.id,
        constraints: state.constraints.set(
          action.constraint.id,
          action.constraint
        ),
      });
    case ConstraintActions.RemoveConstraint:
      return Object.assign({}, state, {
        constraints: (() => {
          state.constraints.delete(action.constraintId);
          return state.constraints;
        })(),
      });
    case ConstraintActions.EditConstraint:
      return Object.assign({}, state, { editingId: action.constraintId });
    case ConstraintActions.ApplyConstraintEdits:
      return Object.assign({}, state, {
        editingId: null,
        constraints: (() => {
          state.constraints.set(action.constraint.id, action.constraint);
          return state.constraints;
        })(),
      });
    default:
      return state;
  }
}

function locationsReducer(
  state: LocationsState,
  action: ActionTypes
): LocationsState {
  switch (action.type) {
    case LocationActions.SelectHouse:
      return Object.assign({}, state, { selectedHouseId: action.houseId });
    case LocationActions.SetHouses:
      return Object.assign({}, state, {
        houses: new Map(
          action.houses.map(house => {
            return [house.id, house];
          })
        ),
      });
    case LocationActions.SetSchools:
      return Object.assign({}, state, {
        schools: new Map(
          action.schools.map(school => {
            return [school.id, school];
          })
        ),
      });
    default:
      return state;
  }
}

export function reducer(state: State, action: ActionTypes): State {
  return {
    controls: controlsReducer(state.controls, action),
    locations: locationsReducer(state.locations, action),
  };
}
