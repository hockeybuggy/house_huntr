import React from "react";
import uuidv4 from "uuid";

import { ConstraintId, Constraint } from "./../types";
import { ConstraintForm } from "./ConstraintForm";
import { ActionTypes, ConstraintActions } from "./../state/actions";

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

interface ControlsProps {
  dispatch: React.Dispatch<ActionTypes>;
  editingId: ConstraintId | null;
  constraints: Map<ConstraintId, Constraint>;
}

export const Controls = (props: ControlsProps) => {
  return (
    <div className="controls-container">
      <p>Refine your search by adding contraints to your house search</p>
      {Array.from(props.constraints.values()).map(constraint => (
        <ConstraintListItem
          key={constraint.id}
          constraint={constraint}
          isEditing={props.editingId === constraint.id}
          removeConstraint={() =>
            props.dispatch({
              type: ConstraintActions.RemoveConstraint,
              constraintId: constraint.id,
            })
          }
          editConstraint={(value: ConstraintId) => {
            props.dispatch({
              type: ConstraintActions.EditConstraint,
              constraintId: value,
            });
          }}
          applyEdits={(value: Constraint) =>
            props.dispatch({
              type: ConstraintActions.ApplyConstraintEdits,
              constraint: value,
            })
          }
        />
      ))}

      <button
        id="add-constraint"
        aria-label="Add constraint"
        disabled={props.editingId !== null}
        onClick={() => {
          props.dispatch({
            type: ConstraintActions.AddConstraint,
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
