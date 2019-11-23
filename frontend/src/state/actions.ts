import { Constraint, ConstraintId, House, HouseId, School } from "./../types";

export enum ConstraintActions {
  AddConstraint = "AddConstraint",
  RemoveConstraint = "RemoveConstraint",
  EditConstraint = "EditConstraint",
  ApplyConstraintEdits = "ApplyConstraintEdits",
}

export enum LocationActions {
  SelectHouse = "SelectHouse",
  SetHouses = "SetHouses",
  SetSchools = "SetSchools",
}

export type ActionTypes =
  | { type: ConstraintActions.AddConstraint; constraint: Constraint }
  | { type: ConstraintActions.RemoveConstraint; constraintId: ConstraintId }
  | { type: ConstraintActions.EditConstraint; constraintId: ConstraintId }
  | { type: ConstraintActions.ApplyConstraintEdits; constraint: Constraint }
  | { type: LocationActions.SelectHouse; houseId: HouseId }
  | { type: LocationActions.SetHouses; houses: Array<House> }
  | { type: LocationActions.SetSchools; schools: Array<School> };
