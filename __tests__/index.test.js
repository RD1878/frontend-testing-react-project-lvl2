import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';
import init from '@hexlet/react-todo-app-with-backend';

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