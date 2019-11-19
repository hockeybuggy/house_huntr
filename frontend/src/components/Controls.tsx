import React, { useReducer, useState } from "react";
import uuidv4 from "uuid";

import { ConstraintId, Constraint } from "./../types";

interface ConstraintFormProps {}
const ConstraintForm = (props: ConstraintFormProps) => {
  const operators = ["<", "<=", "=", ">=", ">"];

  const [selectedOperator, setSelectedOperator] = useState("=");
  return (
    <div>
      <form onSubmit={() => {}}>
        <label htmlFor="constraint-form-type-select">Type of contraint:</label>
        <select name="types" id="constraint-form-type-select">
          <option>{"Number of Bedrooms"}</option>
          <option>{"Number of Bathrooms"}</option>
        </select>

        <label htmlFor="constraint-form-operator-select">Operator:</label>
        <select
          name="types"
          id="constraint-form-operator-select"
          value={selectedOperator}
          onChange={event => {
            setSelectedOperator(event.target.value);
          }}
        >
          {operators.map((operator, i) => {
            return (
              <option key={i} value={operator}>
                {operator}
              </option>
            );
          })}
        </select>

        <label htmlFor="constraint-form-operator-select">Value:</label>
        <input
          type="range"
          id="constraint-form-value-input"
          min={1}
          max={5}
        ></input>
      </form>
      <button
        aria-label="Apply. Finish editing constraint"
        id="constraint-form-submit"
        onClick={() => {}}
      >
        Apply
      </button>
    </div>
  );
};

interface ConstraintListItemProps {
  constraint: Constraint;
  removeConstraint: () => void;
}
const ConstraintListItem = (props: ConstraintListItemProps) => {
  return (
    <div className="constraint-list-item">
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
    </div>
  );
};

enum Actions {
  AddConstraint,
  RemoveConstraint,
}

type ActionType =
  | { type: Actions.AddConstraint; constraint: Constraint }
  | { type: Actions.RemoveConstraint; constraintId: ConstraintId };

interface ControlsState {
  constraints: Map<ConstraintId, Constraint>;
}

function initializeState(): ControlsState {
  return { constraints: new Map() };
}

function reducer(state: ControlsState, action: ActionType): ControlsState {
  switch (action.type) {
    case Actions.AddConstraint:
      return {
        constraints: state.constraints.set(
          action.constraint.id,
          action.constraint
        ),
      };
    case Actions.RemoveConstraint:
      return {
        constraints: (() => {
          state.constraints.delete(action.constraintId);
          return state.constraints;
        })(),
      };
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
          removeConstraint={() =>
            dispatch({
              type: Actions.RemoveConstraint,
              constraintId: constraint.id,
            })
          }
        />
      ))}

      <ConstraintForm />

      <button
        id="add-constraint"
        aria-label="Add constraint"
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
