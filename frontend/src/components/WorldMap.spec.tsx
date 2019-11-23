import { mount } from "enzyme";
import React from "react";

import { WorldMap, WorldMapProps } from "./WorldMap";
import { houseFactory, schoolFactory } from "./../factories";

function render(givenProps: Partial<WorldMapProps>) {
  const defaultProps: WorldMapProps = {
    houses: new Map(),
    schools: new Map(),
    selectedHouseId: null,
    highlightedHouseId: null,
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<WorldMap {...props} />);
  return { wrapper };
}

describe("WorldMap", () => {
  it("renders an empty map when there are no locations", () => {
    const { wrapper } = render({
      houses: new Map(),
      schools: new Map(),
    });

    expect(wrapper.find(".map-container").exists()).toBe(true);
    expect(wrapper.find(".map-location").length).toBe(0);
  });

  it("renders a location with a className and positioning", () => {
    const houses = new Map();
    const house = houseFactory({ location: { x: 10, y: 20 } });
    houses.set(house.id, house);
    const { wrapper } = render({ houses: houses });

    const locations = wrapper.find(".map-location");
    expect(locations.length).toBe(1);
    expect(locations.at(0).hasClass("map-location")).toBe(true);
    const expectedStyles = {
      left: "10px",
      top: "20px",
      backgroundColor: expect.anything(),
    };
    expect(
      locations
        .at(0)
        .find("div")
        .prop("style")
    ).toEqual(expectedStyles);
  });

  it("renders locations with 'house' type as green", () => {
    const houses = new Map();
    const house = houseFactory({});
    houses.set(house.id, house);
    const { wrapper } = render({ houses: houses });

    const houseLocation = wrapper.find(".map-location").first();
    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "green",
    };
    expect(houseLocation.find("div").prop("style")).toEqual(expectedStyles);
  });

  it("renders locations with 'school' type as blue", () => {
    const schools = new Map();
    const school = schoolFactory({});
    schools.set(school.id, school);
    const { wrapper } = render({ schools: schools });

    const schoolLocation = wrapper.find(".map-location").first();
    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "blue",
    };
    expect(schoolLocation.find("div").prop("style")).toEqual(expectedStyles);
  });

  it("renders selected locations as red", () => {
    const houses = new Map();
    const house = houseFactory({});
    houses.set(house.id, house);
    const selectedHouseId = house.id;
    const { wrapper } = render({
      houses: houses,
      selectedHouseId: selectedHouseId,
    });

    const selected = wrapper.find(".map-location").first();

    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "red",
    };
    expect(selected.find("div").prop("style")).toEqual(expectedStyles);
  });

  it("renders selected locations as orange", () => {
    const houses = new Map();
    const house = houseFactory({});
    houses.set(house.id, house);
    const highlightedHouseId = house.id;
    const { wrapper } = render({
      houses: houses,
      highlightedHouseId: highlightedHouseId,
    });

    const selected = wrapper.find(".map-location").first();

    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "orange",
    };
    expect(selected.find("div").prop("style")).toEqual(expectedStyles);
  });
});
