export type LocationTypes = "house" | "school";

export type Locateable = {
  type: LocationTypes;
  location: { x: number; y: number };
};
