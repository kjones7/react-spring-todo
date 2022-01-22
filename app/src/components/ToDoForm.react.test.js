import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";
import ToDoForm from './ToDoForm';

// Snapshot tests
test('Initial snapshot', () => {
  const component = renderer.create(
      <ToDoForm />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// Other tests
test('Fetch and display single task', async () => {
  // setup a DOM element as a render target
  let container = document.createElement("div");
  document.body.appendChild(container);

  const fakeTasks = [{
    id: 1,
    description: 'Task 1',
  }];

  global.fetch = jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeTasks)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<ToDoForm />, container);
  });

  // Assert
  expect(container.querySelectorAll('li').length).toBe(1);
  expect(container.querySelectorAll('li')[0].textContent).toBe(fakeTasks[0].description);

  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});