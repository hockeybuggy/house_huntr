import { mount } from "enzyme";
import * as React from "react";

import { HouseList, HouseListProps } from "./HouseList";
import { houseFactory } from "./../factories";

function render(givenProps: Partial<HouseListProps>) {
  const defaultProps: HouseListProps = {
    houses: [],
    selectHouse: () => {},
    selectedHouseId: null,
    highlightHouse: () => {},
    highlightedHouseId: null,
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<HouseList {...props} />);
  return { wrapper };
}

describe("HouseList", () => {
  it("renders an empty list if there are no houses", () => {
    const { wrapper } = render({ houses: [] });
    expect(wrapper.find(".house-list-container").exists()).toBe(true);
    expect(wrapper.find(".house-list").exists()).toBe(true);
    expect(wrapper.find(".house-list-item").length).toEqual(0);
  });

  describe("HouseListItem", () => {
    it("renders houses as list items", () => {
      const { wrapper } = render({
        houses: [
          houseFactory({ address: { streetName: "123 Fake Street" } }),
          houseFactory({ address: { streetName: "123 Gefälschte Straße" } }),
        ],
      });

      expect(wrapper.find(".house-list-item").length).toEqual(2);
      const firstListItem = wrapper.find(".house-list-item").at(0);
      expect(firstListItem.text()).toEqual("123 Fake Street");
      const secondListItem = wrapper.find(".house-list-item").at(1);
      expect(secondListItem.text()).toEqual("123 Gefälschte Straße");
    });

    it("does not have the className 'house-list-item--selected' when not selected", () => {
      const house = houseFactory({});

      const { wrapper } = render({
        houses: [house],
        selectedHouseId: null,
      });

      expect(
        wrapper
          .find(".house-list-item")
          .first()
          .hasClass("house-list-item--selected")
      ).toBe(false);
    });

    it("has the className 'house-list-item--selected' when selected", () => {
      const house = houseFactory({});

      const { wrapper } = render({
        houses: [house],
        selectedHouseId: house.id,
      });

      expect(
        wrapper
          .find(".house-list-item")
          .first()
          .hasClass("house-list-item--selected")
      ).toBe(true);
    });

    it("calls the `selectHouse` callback when clicked", () => {
      const house = houseFactory({});
      const selectHouseSpy = jest.fn();

      const { wrapper } = render({
        houses: [house],
        selectedHouseId: null,
        selectHouse: selectHouseSpy,
      });

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("click");

      expect(selectHouseSpy).toHaveBeenCalledWith(house.id);
    });

    it("calls a callback to highlight the house when the mouse enters", () => {
      const house = houseFactory({});
      const highlightHouseSpy = jest.fn();

      const { wrapper } = render({
        houses: [house],
        highlightHouse: highlightHouseSpy,
      });

      expect(highlightHouseSpy).not.toHaveBeenCalled();

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("mouseenter");

      expect(highlightHouseSpy).toHaveBeenCalledWith(house.id);
    });

    it("calls a callback to clear highlighting when the mouse leaves", () => {
      const house = houseFactory({});
      const highlightHouseSpy = jest.fn();

      const { wrapper } = render({
        houses: [house],
        highlightHouse: highlightHouseSpy,
      });

      expect(highlightHouseSpy).not.toHaveBeenCalled();

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("mouseleave");

      expect(highlightHouseSpy).toHaveBeenCalledWith(null);
    });
  });
});
