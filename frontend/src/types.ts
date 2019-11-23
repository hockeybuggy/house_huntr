export type LocationTypes = "house" | "school";

export type Locateable = {
  type: LocationTypes;
  address: { streetName: string };
  location: { x: number; y: number };
};

export type HouseId = string;

export interface House extends Locateable {
  type: "house";
  id: HouseId;
  num_bedrooms: number;
  num_bathrooms: number;
}

export type SchoolId = string;

export interface School extends Locateable {
  type: "school";
  id: SchoolId;
}

export type ConstraintId = string;

export type ConstraintTypes = "bedrooms" | "bathroom";
export type ConstraintOperator = "<" | "<=" | "=" | ">=" | ">";

export interface Constraint {
  type: ConstraintTypes;
  id: ConstraintId;
  operator: ConstraintOperator;
  value: number;
}
