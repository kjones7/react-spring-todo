import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import ToDoForm from './ToDoForm';

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
  expect(container.querySelectorAll('tr').length).toBe(1);
  expect(container.querySelectorAll('tr')[0].textContent).toBe(fakeTasks[0].description);

  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.fetch.mockRestore();
});

test('Fetch and display multiple tasks', async () => {
  // setup a DOM element as a render target
  let container = document.createElement("div");
  document.body.appendChild(container);

  const fakeTasks = [
      {
        id: 1,
        description: 'Task 1',
      },{
        id: 2,
        description: 'Task 2',
      }
  ];

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
  expect(container.querySelectorAll('tr').length).toBe(2);
  expect(container.querySelectorAll('tr')[0].textContent).toBe(fakeTasks[0].description);
  expect(container.querySelectorAll('tr')[1].textContent).toBe(fakeTasks[1].description);

  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.fetch.mockRestore();
});

test('"Add task" handler executes, input resets', async () => {
  // Arrange

  // setup a DOM element as a render target
  let container = document.createElement("div");
  document.body.appendChild(container);

  // Setup other data
  const fakeTask = 'Task 1';
  const fakeTasks = [];

  global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeTasks)
      })
  );

  // Act

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<ToDoForm />, container);
  });

  const addBtn = container.querySelector('.add-btn');
  const taskInput = container.querySelector('.add-task-input');

  // Set input text and add task
  ReactTestUtils.act(() => {
    taskInput.value = fakeTask;
    addBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  // Assert
  expect(container.querySelectorAll('tr').length).toBe(1);
  expect(container.querySelectorAll('tr')[0].textContent).toBe(fakeTask);

  // Cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  global.fetch.mockRestore();
});
