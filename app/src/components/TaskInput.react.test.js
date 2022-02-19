import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils from 'react-dom/test-utils';
import TaskInput from './TaskInput';

// Other tests
test('Valid task gets added, input resets', async () => {
  // Arrange

  // setup a DOM element as a render target
  let container = document.createElement("div");
  document.body.appendChild(container);

  // Setup other data
  const fakeTask = 'Task 1';
  let allTasks = [];
  const setTasks = function(newTasks) {
    allTasks = newTasks;
  }

  // Act

  // Render component
  ReactTestUtils.act(() => {
    render(<TaskInput tasks={allTasks} setTasks={setTasks} />, container);
  });

  const addBtn = container.querySelector('.add-btn');
  const taskInput = container.querySelector('.add-task-input');

  // Set input text and add task
  ReactTestUtils.act(() => {
    taskInput.value = fakeTask;
    addBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });

  // Assert

  // Assert that tasks were added
  expect(allTasks.length).toBe(1);
  expect(allTasks[0]).toBe(fakeTask);

  // Assert that input resets after tasks were added
  expect(taskInput.value).toBe('');

  // Cleanup
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
