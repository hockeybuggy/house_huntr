import React, { useState } from "react";

import {
  ConstraintId,
  ConstraintTypes,
  ConstraintOperator,
  Constraint,
} from "./../types";

export interface ConstraintFormProps {
  // I am thinking that this form will be used as an "edit state" for "constraints".
  constraint: Constraint;
  onSubmit: (constraint: Constraint) => void;
}

const constraintTypes = ["bedrooms", "bathrooms"];
const operators = ["<", "<=", "=", ">=", ">"];

export const ConstraintForm = (props: ConstraintFormProps) => {
  const [selectedOperator, setSelectedOperator] = useState(
    props.constraint.operator
  );
  const [selectedConstraintType, setSelectedConstraintType] = useState(
    props.constraint.type
  );
  const [selectedValue, setSelectedValue] = useState(props.constraint.value);

  const onFormSubmit = (event: any) => {
    event.preventDefault();
    props.onSubmit({
      id: props.constraint.id,
      type: selectedConstraintType,
      operator: selectedOperator,
      value: selectedValue,
    });
  };

  return (
    <div className="constraint-form">
      <form onSubmit={onFormSubmit}>
        <label htmlFor="constraint-form-type-select">Type of contraint:</label>
        <select
          name="types"
          id="constraint-form-type-select"
          value={selectedConstraintType}
          onChange={event => {
            setSelectedConstraintType(event.target.value as ConstraintTypes);
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
            setSelectedOperator(event.target.value as ConstraintOperator);
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

        <label htmlFor="constraint-form-value-input">
          Value: {selectedValue}
        </label>
        <input
          type="range"
          id="constraint-form-value-input"
          value={selectedValue}
          onChange={event => {
            setSelectedValue(parseInt(event.target.value, 10));
          }}
          min={1}
          max={5}
        ></input>

        <button
          className="constraint-form-cancel"
          aria-label="Cancel editing"
          onClick={() => props.onSubmit(props.constraint)}
        >
          Cancel
        </button>
        <input className="constraint-form-submit" type="submit" value="Apply" />
      </form>
    </div>
  );
};
