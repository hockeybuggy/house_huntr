import React, { useReducer, useState } from "react";
import uuidv4 from "uuid";

import { ConstraintId, Constraint } from "./../types";
import { ConstraintForm } from "./ConstraintForm";

interface ConstraintListItemProps {
  constraint: Constraint;
  isEditing: boolean;
  removeConstraint: () => void;
  editConstraint: (constraintId: ConstraintId) => void;
  applyEdits: (constraint: Constraint) => void;
}

const ConstraintListItem = (props: ConstraintListItemProps) => {
  return (
    <div className="constraint-list-item">
      {props.isEditing ? (
        <ConstraintForm
          constraint={props.constraint}
          onSubmit={props.applyEdits}
        />
      ) : (
        <React.Fragment>
          <p>
            {props.constraint.type}
            {props.constraint.operator}
            {props.constraint.value}
          </p>
          <button
            className="remove-constraint-list-item"
            aria-label="Remove this constraint"
            onClick={() => props.removeConstraint()}
          >
            remove
          </button>
          <button
            className="edit-constraint-list-item"
            aria-label="Edit this constraint"
            onClick={() => props.editConstraint(props.constraint.id)}
          >
            edit
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

enum Actions {
  AddConstraint,
  RemoveConstraint,
  EditConstraint,
  ApplyConstraintEdits,
}

type ActionType =
  | { type: Actions.AddConstraint; constraint: Constraint }
  | { type: Actions.RemoveConstraint; constraintId: ConstraintId }
  | { type: Actions.EditConstraint; constraintId: ConstraintId }
  | { type: Actions.ApplyConstraintEdits; constraint: Constraint };

interface ControlsState {
  editingId: ConstraintId | null;
  constraints: Map<ConstraintId, Constraint>;
}

function initializeState(): ControlsState {
  return {
    editingId: null,
    constraints: new Map(),
  };
}

function reducer(state: ControlsState, action: ActionType): ControlsState {
  switch (action.type) {
    case Actions.AddConstraint:
      return Object.assign({}, state, {
        editingId: action.constraint.id,
        constraints: state.constraints.set(
          action.constraint.id,
          action.constraint
        ),
      });
    case Actions.RemoveConstraint:
      return Object.assign({}, state, {
        constraints: (() => {
          state.constraints.delete(action.constraintId);
          return state.constraints;
        })(),
      });
    case Actions.EditConstraint:
      return Object.assign({}, state, { editingId: action.constraintId });
    case Actions.ApplyConstraintEdits:
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

export interface ControlsProps {}

export const Controls = (props: ControlsProps) => {
  const [state, dispatch] = useReducer(reducer, null, initializeState);

  return (
    <div className="controls-container">
      <p>Refine your search by adding contraints to your house search</p>
      {Array.from(state.constraints.values()).map(constraint => (
        <ConstraintListItem
          key={constraint.id}
          constraint={constraint}
          isEditing={state.editingId === constraint.id}
          removeConstraint={() =>
            dispatch({
              type: Actions.RemoveConstraint,
              constraintId: constraint.id,
            })
          }
          editConstraint={(value: ConstraintId) => {
            dispatch({
              type: Actions.EditConstraint,
              constraintId: value,
            });
          }}
          applyEdits={(value: Constraint) =>
            dispatch({
              type: Actions.ApplyConstraintEdits,
              constraint: value,
            })
          }
        />
      ))}

      <button
        id="add-constraint"
        aria-label="Add constraint"
        disabled={state.editingId !== null}
        onClick={() => {
          dispatch({
            type: Actions.AddConstraint,
            constraint: {
              type: "bedrooms",
              id: uuidv4(),
              operator: "=",
              value: 3,
            },
          });
        }}
      >
        Add constraint
      </button>
    </div>
  );
};
