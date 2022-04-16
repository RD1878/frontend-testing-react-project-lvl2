import { render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import * as React from 'react';
import init from '@hexlet/react-todo-app-with-backend';
import userEvent from "@testing-library/user-event";

const Application = init({
  lists: [
    { id: '1', name: 'primary', removable: false },
    { id: '2', name: 'secondary', removable: true },
  ],
  tasks: [],
  currentListId: '1',
});

const ApplicationWithOneTask = init({
  lists: [
    { id: '1', name: 'primary', removable: false },
    { id: '2', name: 'secondary', removable: true },
  ],
  tasks: [{
    text: 'test',
    listId: '1',
    id: '20',
    completed: false,
    touched: Date.now(),
  }],
  currentListId: '1',
});

describe('App', () => {
  it('render App', () => {
    render(Application)
    //screen.debug()
    expect(screen.getByText(/hexlet todos/i)).toBeInTheDocument();
    expect(screen.getByText(/lists/i)).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Tasks list is empty')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/List name.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please type text.../i)).toBeInTheDocument();

    expect(screen.getByText('Add')).toBeInTheDocument();
    const buttonsCount = screen.getAllByRole('button').length;
    expect(buttonsCount).toBe(5);

    expect(screen.getByRole('list')).toBeInTheDocument();
  })
})

describe('actions with any task', () => {
  test('add task', async () => {
    const text = 'test';
    render(Application);
    await userEvent.type(screen.getByPlaceholderText(/Please type text.../i), text);
    await userEvent.click(screen.getByText('Add'));
    await waitFor(async () => {
      expect(await screen.findByTestId('tasks')).toBeInTheDocument();
      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(await screen.queryByText('Tasks list is empty')).not.toBeInTheDocument();
    })
  })

  test('check checkbox', async () => {
    const text = 'test';
    render(ApplicationWithOneTask);
    await userEvent.click(screen.getByRole('checkbox'));
    await waitFor(async () => {
      expect(await screen.findByText(text)).toBeInTheDocument();
    });
  })

  test('remove task', async () => {
    render(ApplicationWithOneTask);
    await userEvent.click(screen.getByText('Remove'));
    await waitFor(async () => {
      expect(await screen.findByText('Tasks list is empty')).toBeInTheDocument();
    });
  })
})

