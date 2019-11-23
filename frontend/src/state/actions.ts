import { Constraint, ConstraintId, HouseId } from "./../types";

export enum ConstraintActions {
  AddConstraint,
  RemoveConstraint,
  EditConstraint,
  ApplyConstraintEdits,
}

export enum LocationActions {
  SelectHouse,
}

export type ActionTypes =
  | { type: ConstraintActions.AddConstraint; constraint: Constraint }
  | { type: ConstraintActions.RemoveConstraint; constraintId: ConstraintId }
  | { type: ConstraintActions.EditConstraint; constraintId: ConstraintId }
  | { type: ConstraintActions.ApplyConstraintEdits; constraint: Constraint }
  | { type: LocationActions.SelectHouse; houseId: HouseId };