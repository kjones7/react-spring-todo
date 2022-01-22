import renderer from "react-test-renderer";
import ToDoForm from "./ToDoForm";
import React from "react";

test('Initial snapshot', () => {
  const component = renderer.create(
      <ToDoForm />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});