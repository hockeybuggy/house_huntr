import React, { useReducer } from "react";
import uuidv4 from "uuid";

import { Constraint } from "./../types";

interface ConstraintProps {
  constraint: Constraint;
  removeConstraint: () => void;
}
const ConstraintList = (props: ConstraintProps) => {
  return (
    <div className="constraint">
      <p>
        {props.constraint.type}
        {props.constraint.operator}
        {props.constraint.value}
      </p>
      <button onClick={() => props.removeConstraint()}>remove</button>
    </div>
  );
};

enum Actions {
  AddConstraint,
  RemoveConstraint,
}

type ActionType =
  | { type: Actions.AddConstraint; constraint: Constraint }
  | { type: Actions.RemoveConstraint; constraintIndex: number };

interface ControlsState {
  constraints: Array<Constraint>;
}

const initialState: ControlsState = {
  constraints: [],
};

function reducer(state: ControlsState, action: ActionType): ControlsState {
  console.log(state, action);
  switch (action.type) {
    case Actions.AddConstraint:
      return { constraints: state.constraints.concat([action.constraint]) };
    case Actions.RemoveConstraint:
      return {
        constraints: state.constraints.splice(action.constraintIndex, 1),
      };
    default:
      throw new Error("Not exaustive reducer");
  }
}

interface ControlsProps {}

export const Controls = (props: ControlsProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="controls-container">
      <p>Refine your search by adding contraints to your house search</p>
      {state.constraints.map((constraint, i) => (
        <ConstraintList
          key={i}
          constraint={constraint}
          removeConstraint={() =>
            dispatch({ type: Actions.RemoveConstraint, constraintIndex: i })
          }
        />
      ))}

      <form>
        <label htmlFor="constraint-type-select">Type of contraint:</label>
        <select name="types" id="constraint-type-select">
          <option>{"Number of Bedrooms"}</option>
          <option>{"Number of Bathrooms"}</option>
        </select>

        <label htmlFor="constraint-operator-select">Operator:</label>
        <select name="types" id="constraint-operator-select">
          <option>{"<"}</option>
          <option>{"<="}</option>
          <option>{"="}</option>
          <option>{">="}</option>
          <option>{">"}</option>
        </select>

        <label htmlFor="constraint-operator-select">Value:</label>
        <input type="range" id="constraint-value-input" min={1} max={5}></input>
      </form>

      <button
        onClick={() => {
          dispatch({
            type: Actions.AddConstraint,
            constraint: { type: "bedrooms", operator: "=", value: 3 },
          });
        }}
      >
        Add constraint
      </button>
    </div>
  );
};
