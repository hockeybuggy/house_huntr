import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

import { Controls, ControlsProps } from "./Controls";

class ControlsTestHelper {
  // This class allows these tests to have a declarative interface since I
  // expect to change this component a lot as I am developing it and I would
  // like to have the many repeated steps encapsulated.
  public wrapper: ReactWrapper;

  constructor(givenProps: Partial<ControlsProps>) {
    const defaultProps: ControlsProps = {};
    const props = {
      ...defaultProps,
      ...givenProps,
    };
    this.wrapper = mount(<Controls {...props} />);
    this.wrapper.mount();
    this.wrapper.update();
    expect(this.wrapper.find(".constraint-list-item").length).toBe(0);
  }

  clickAddContraint(): this {
    this.wrapper.find("#add-constraint").simulate("click");
    return this;
  }

  clickRemoveConstraintListItem(index: number): this {
    this.wrapper
      .find(".remove-constraint-list-item")
      .at(index)
      .simulate("click");
    return this;
  }
}

describe("Controls", () => {
  it("renders an empty list list of constraints to start with", () => {
    const { wrapper } = new ControlsTestHelper({});
    expect(wrapper.find(".controls-container").exists()).toBe(true);
    expect(wrapper.find(".constraint-list-item").exists()).toBe(false);
  });

  it("adds a new bedroom constraint when the 'add-constraint' button is clicked", () => {
    const helper = new ControlsTestHelper({});

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(0);

    helper.clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(1);

    helper.clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(2);
  });

  it("removes constraints when that constraint list item's 'remove' button is clicked", () => {
    // Create some controls with two constraints
    const helper = new ControlsTestHelper({})
      .clickAddContraint()
      .clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(2);

    helper.clickRemoveConstraintListItem(1);

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(1);
  });
});
