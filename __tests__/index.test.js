import {findAllByRole, fireEvent, render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import init from '@hexlet/react-todo-app-with-backend';
import {rest} from 'msw'
import {setupServer} from 'msw/node';
import userEvent from "@testing-library/user-event";
//import { server } from '../mocks/server.js';

const server = setupServer(
  rest.get('http://localhost/',
    (req, res, ctx) => {
    return res(ctx.status(200))
  }),
)

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const Application = init({});

describe('App', () => {
  it('render App', () => {
    render(Application)
    // screen.debug()
    expect(screen.getByText(/hexlet todos/i)).toBeInTheDocument();
    expect(screen.getByText(/lists/i)).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Tasks list is empty')).toBeInTheDocument();

    expect(screen.getByPlaceholderText(/List name.../i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Please type text.../i)).toBeInTheDocument();

    expect(screen.getByText('Add')).toBeInTheDocument();
    const buttonsCount = screen.getAllByRole('button').length;
    expect(buttonsCount).toBe(2);

    expect(screen.getByRole('list')).toBeInTheDocument();
  })
})

describe('tasks', () => {
  it('add task', async () => {
    const text = 'test';


    server.use(
      rest.post('http://localhost/api/v1/lists/1/tasks', (req, res, ctx) => {
        const {text} = req.body;
        return res(
          ctx.status(201),
          ctx.json({
            completed: false,
            id: 20,
            listId: 1,
            text: text,
            touched: Date.now(),
          })
        )
      }))
    server.printHandlers()
    render(Application);

    await userEvent.type(screen.getByPlaceholderText(/Please type text.../i), text);
    await userEvent.click(screen.getByText('Add'));
    const items = await waitFor(() => screen.findByRole('listitem'))
    console.log(items)
    expect(items).toBeInTheDocument();

  })
})
