export type LocationTypes = "house" | "school";

export type Locateable = {
  type: LocationTypes;
  location: { x: number; y: number };
};

export interface House extends Locateable {
  type: "house";
  num_bedrooms: number;
  num_bathrooms: number;
}

export interface School extends Locateable {
  type: "school";
}
