import { mount } from "enzyme";
import * as React from "react";

import { Map, MapProps } from "./Map";

function render(props: MapProps) {
  const wrapper = mount(<Map {...props} />);
  return { wrapper };
}

describe("Map", () => {
  it("render an empty map when there are no locations", () => {
    const { wrapper } = render({
      locations: [],
    });

    expect(wrapper.find(".map-container").exists()).toBe(true);
    expect(wrapper.find(".map-location").length).toBe(0);
  });

  it("renders a location with a className and positioning", () => {
    const { wrapper } = render({
      locations: [{ type: "house", location: { x: 10, y: 20 } }],
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
      locations: [{ type: "house", location: { x: 10, y: 20 } }],
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
      locations: [{ type: "school", location: { x: 10, y: 20 } }],
    });

    const house = wrapper.find(".map-location").first();
    const expectedStyles = {
      left: expect.anything(),
      top: expect.anything(),
      backgroundColor: "blue",
    };
    expect(house.find("div").prop("style")).toEqual(expectedStyles);
  });
});
