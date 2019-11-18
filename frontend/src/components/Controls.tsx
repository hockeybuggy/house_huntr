import React, { useEffect, useRef, useState } from "react";
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

interface ControlsProps {}

export const Controls = (props: ControlsProps) => {
  const [constraints, setContraints] = useState<Array<Constraint>>([]);
  const constraintsRef = useRef();

  useEffect(() => {
    constraintsRef.current = constraints;
  });

  const removeNthElementFromConstrints = (i: number): void => {
    setContraints(() => constraintsRef.current.splice(i, 1));
  };

  return (
    <div className="controls-container">
      <p>Refine your search by adding contraints to your house search</p>
      {constraints.map((constraint, i) => (
        <ConstraintList
          key={i}
          constraint={constraint}
          removeConstraint={() => removeNthElementFromConstrints(i)}
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
          setContraints(
            constraints.concat([
              {
                type: "bedrooms",
                operator: "=",
                value: 3,
              },
            ])
          );
        }}
      >
        Add constraint
      </button>
    </div>
  );
};
