import React, { useState } from "react";

import { ConstraintId, Constraint } from "./../types";

export interface ConstraintFormProps {
  // I am thinking that this form will be used as an "edit state" for "constraints".
  constraint: Constraint;
  onSubmit: (constraint: Constraint) => void;
}

const constraintTypes = ["Number of Bedrooms", "Number of Bathrooms"];
const operators = ["<", "<=", "=", ">=", ">"];

export const ConstraintForm = (props: ConstraintFormProps) => {
  const [selectedOperator, setSelectedOperator] = useState(operators[2]);
  const [selectedConstraintTypes, setSelectedConstraintTypes] = useState(
    constraintTypes[0]
  );

  const onSubmit = (event: any) => {
    event.preventDefault();
    // TODO unstub this
    props.onSubmit({
      id: props.constraint.id,
      type: props.constraint.type,
      operator: props.constraint.operator,
      value: props.constraint.value,
    });
  };

  return (
    <div className="constraint-form">
      <form onSubmit={onSubmit}>
        <label htmlFor="constraint-form-type-select">Type of contraint:</label>
        <select
          name="types"
          id="constraint-form-type-select"
          value={selectedConstraintTypes}
          onChange={event => {
            setSelectedConstraintTypes(event.target.value);
          }}
        >
          {constraintTypes.map((constraintType, i) => {
            return (
              <option key={i} value={constraintType}>
                {constraintType}
              </option>
            );
          })}
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

        <label htmlFor="constraint-form-value-input">Value:</label>
        <input
          type="range"
          id="constraint-form-value-input"
          min={1}
          max={5}
        ></input>

        <input id="constraint-form-submit" type="submit" value="Apply" />
      </form>
    </div>
  );
};
