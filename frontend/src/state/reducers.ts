import { Constraint, ConstraintId } from "./../types";
import { ConstraintActions, ActionTypes } from "./actions";

interface ControlsState {
  editingId: ConstraintId | null;
  constraints: Map<ConstraintId, Constraint>;
}

interface State {
  controls: ControlsState;
}

export function initializeState(): State {
  return {
    controls: {
      editingId: null,
      constraints: new Map(),
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
      throw new Error("Not exaustive reducer");
  }
}

export function reducer(state: State, action: ActionTypes): State {
  return {
    controls: controlsReducer(state.controls, action),
  };
}
