import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

import { constraintFactory } from "./../factories";
import { ConstraintForm, ConstraintFormProps } from "./ConstraintForm";

function render(givenProps: Partial<ConstraintFormProps>) {
  const defaultProps = {
    constraint: constraintFactory({}),
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
    expect(wrapper.find(".constraint-form-submit").exists()).toBe(true);
  });

  it("calls the `onSubmit` callback when the form is submitted", () => {
    const constraint = constraintFactory({});
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({
      onSubmit: onSubmitSpy,
      constraint: constraint,
    });
    const submitButton = wrapper.find(".constraint-form-submit");

    expect(onSubmitSpy).not.toHaveBeenCalled();

    submitButton.simulate("submit");

    // Since we haven't changed any of the values in the form the constraint
    // should be returned as is.
    expect(onSubmitSpy).toHaveBeenCalledWith(constraint);
  });
});
