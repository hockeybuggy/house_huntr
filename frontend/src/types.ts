export type LocationTypes = "house" | "school";

export type Locateable = {
  type: LocationTypes;
  location: { x: number; y: number };
};

export type HouseId = string;

export interface House extends Locateable {
  type: "house";
  id: HouseId;
  num_bedrooms: number;
  num_bathrooms: number;
}

export interface School extends Locateable {
  type: "school";
}
