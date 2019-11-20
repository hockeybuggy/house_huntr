import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

import { ConstraintForm, ConstraintFormProps } from "./ConstraintForm";

function render(givenProps: Partial<ConstraintFormProps>) {
  const defaultProps = {
    // constraint: constraintFactory({}),
    constraint: {},
    onSubmit: () => {},
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<ConstraintForm {...props} />);
  return { wrapper };
}

describe("ConstraintForm", () => {
  it("renders a form with some inputs", () => {
    const { wrapper } = render({});

    expect(wrapper.find(".constraint-form").exists()).toBe(true);
    expect(wrapper.find("#constraint-form-submit").exists()).toBe(true);
  });

  it("calls the `onSubmit` callback when the form is submitted", () => {
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({ onSubmit: onSubmitSpy });
    const submitButton = wrapper.find("#constraint-form-submit");

    expect(onSubmitSpy).not.toHaveBeenCalled();

    submitButton.simulate("click");

    expect(onSubmitSpy).toHaveBeenCalledWith();
  });
});
