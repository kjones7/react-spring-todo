import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';
import TaskInput from './TaskInput';

// Other tests
test('"Add task" handler executes, input resets', async () => {
  // Arrange

  // setup a DOM element as a render target
  let container = document.createElement("div");
  document.body.appendChild(container);

  // Setup other data
  const fakeTask = 'Task 1';
  const addTaskMock = jest.fn();

  // Act

  // Render component
  ReactTestUtils.act(() => {
    render(<TaskInput addTask={addTaskMock} />, container);
  });

  const addBtn = container.querySelector('.add-btn');
  const taskInput = container.querySelector('.add-task-input');

  // Set input text and add task
  ReactTestUtils.act(() => {
    taskInput.value = fakeTask;
    addBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  // Assert
  expect(addTaskMock.mock.calls.length).toBe(1);

  // Assert that input resets after tasks were added
  expect(taskInput.value).toBe('');

  // Cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
