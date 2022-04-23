import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import init from '@hexlet/react-todo-app-with-backend';
import userEvent from '@testing-library/user-event';

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
    render(Application);
    expect(screen.getByText(/hexlet todos/i)).toBeInTheDocument();
    expect(screen.getByText(/lists/i)).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Tasks list is empty')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/List name.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please type text.../i)).toBeInTheDocument();

    expect(screen.getByText('Add')).toBeInTheDocument();
    expect(screen.getByText(/add list/i).closest('button')).toBeInTheDocument();

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});

describe('actions with any task', () => {
  test('add task', async () => {
    const text = 'test';
    render(Application);
    userEvent.type(screen.getByPlaceholderText(/Please type text.../i), text);
    userEvent.click(screen.getByText('Add'));
    await waitFor(async () => {
      expect(await screen.findByTestId('tasks')).toBeInTheDocument();
      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(await screen.queryByText('Tasks list is empty')).not.toBeInTheDocument();
    });
  });

  test('check checkbox', async () => {
    render(ApplicationWithOneTask);
    userEvent.click(screen.getByRole('checkbox'));
    await waitFor(async () => {
      expect(screen.getByRole('checkbox')).toBeChecked();
    });
  });

  test('remove task', async () => {
    render(ApplicationWithOneTask);
    userEvent.click(screen.getByText('Remove'));
    await waitFor(async () => {
      expect(await screen.findByText('Tasks list is empty')).toBeInTheDocument();
    });
  });
});

describe('actions with lists', () => {
  test('del list', async () => {
    render(Application);
    userEvent.click(screen.getByText(/remove list/i).closest('button'));
    await waitFor(async () => {
      expect(screen.queryByText(/secondary/i)).not.toBeInTheDocument();
    });
  });

  test('add list', async () => {
    const text = 'testList';
    render(Application);
    const addListButton = screen.getByText(/add list/i).closest('button');
    userEvent.type(screen.getByPlaceholderText(/List name.../i), text);
    userEvent.click(addListButton);
    await waitFor(async () => {
      expect(await screen.findByText(text)).toBeInTheDocument();
      expect(await screen.findByText('Tasks list is empty')).toBeInTheDocument();
    });
  });

  /* test('change list - add task - del list - add list', async () => {
    const textList = 'secondary';
    const textTask = 'test';
    render(Application);
    userEvent.click(screen.getByText(/secondary/i).closest('button'));
    userEvent.type(screen.getByPlaceholderText(/Please type text.../i), textTask);
    userEvent.click(screen.getByText('Add'));
    userEvent.click(screen.getByText(/remove list/i).closest('button'))
    const addListButton = screen.getByText(/add list/i).closest('button');
    userEvent.type(screen.getByPlaceholderText(/List name.../i), textList);
    userEvent.click(addListButton);
    await waitFor(async () => {
      expect(await screen.findByText('Tasks list is empty')).toBeInTheDocument();
    })
  }) */

  /* test('add double list', async () => {
    const textList = 'secondary';
    render(Application);
    const addListButton = screen.getByText(/add list/i).closest('button');
    await userEvent.type(screen.getByPlaceholderText(/List name.../i), textList);
    await userEvent.click(addListButton);
    await waitFor(async () => {
      expect(await screen.findByText(`${textList} already exists`)).toBeInTheDocument();
    })
  }) */

  /* test('check two lists', async () => {
    const textTask1 = 'test1';
    const textTask2 = 'test2';
    render(Application);
    userEvent.type(screen.getByPlaceholderText(/Please type text.../i), textTask1);
    userEvent.click(screen.getByText('Add'));
    userEvent.click(screen.getByText(/secondary/i).closest('button'));
    // await userEvent.type(screen.getByPlaceholderText(/Please type text.../i), textTask2);
    // await userEvent.click(screen.getByText('Add'));
    // await userEvent.click(screen.getByText(/Remove/i));
    // await userEvent.click(screen.getByText(/primary/i).closest('button'));
    await waitFor(async () => {
      // console.log(await screen.debug());
      expect(await screen.findByText(textTask1)).toBeInTheDocument();
    })
    console.log( await screen.debug());
  }) */
});
