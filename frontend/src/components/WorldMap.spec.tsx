import { mount } from "enzyme";
import * as React from "react";

import { WorldMap, WorldMapProps } from "./WorldMap";
import { houseFactory, schoolFactory } from "./../factories";

function render(props: WorldMapProps) {
  // TODO refactor to have defaults
  const wrapper = mount(<WorldMap {...props} />);
  return { wrapper };
}

describe("WorldMap", () => {
  it("renders an empty map when there are no locations", () => {
    const { wrapper } = render({
      locations: [],
      selectedHouseId: null,
      highlightedHouseId: null,
    });

    expect(wrapper.find(".map-container").exists()).toBe(true);
    expect(wrapper.find(".map-location").length).toBe(0);
  });

  it("renders a location with a className and positioning", () => {
    const { wrapper } = render({
      locations: [houseFactory({ location: { x: 10, y: 20 } })],
      selectedHouseId: null,
      highlightedHouseId: null,
    });

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
    const { wrapper } = render({
      locations: [houseFactory({})],
      selectedHouseId: null,
      highlightedHouseId: null,
    });

    const house = wrapper.find(".map-location").first();
    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "green",
    };
    expect(house.find("div").prop("style")).toEqual(expectedStyles);
  });

  it("renders locations with 'school' type as blue", () => {
    const { wrapper } = render({
      locations: [schoolFactory({})],
      selectedHouseId: null,
      highlightedHouseId: null,
    });

    const house = wrapper.find(".map-location").first();
    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "blue",
    };
    expect(house.find("div").prop("style")).toEqual(expectedStyles);
  });

  it("renders selected locations as red", () => {
    const house = houseFactory({});
    const selectedHouseId = house.id;
    const { wrapper } = render({
      locations: [house],
      selectedHouseId: selectedHouseId,
      highlightedHouseId: null,
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
    const house = houseFactory({});
    const highlightedHouseId = house.id;
    const { wrapper } = render({
      locations: [house],
      selectedHouseId: null,
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
