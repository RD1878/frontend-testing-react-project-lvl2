import { rest } from 'msw';

const baseUrl = '/api/v1/';

const handlers = [
  rest.post(`${baseUrl}lists/1/tasks`, (req, res, ctx) => {
    const { text } = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        completed: false,
        id: '20',
        listId: '1',
        text,
        touched: Date.now(),
      }),
    );
  }),

  rest.post(`${baseUrl}lists/2/tasks`, (req, res, ctx) => {
    const { text } = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        completed: false,
        id: '40',
        listId: '2',
        text,
        touched: Date.now(),
      }),
    );
  }),

  rest.delete(`${baseUrl}tasks/20`, (req, res, ctx) => res(
    ctx.status(204),
  )),

  rest.delete(`${baseUrl}tasks/40`, (req, res, ctx) => res(
    ctx.status(204),
  )),

  rest.patch(`${baseUrl}tasks/20`, (req, res, ctx) => res(
    ctx.status(201),
    ctx.json({
      completed: true,
      id: '20',
      listId: '1',
      text: 'test',
      touched: Date.now(),
    }),
  )),

  rest.post(`${baseUrl}lists`, (req, res, ctx) => {
    const { name } = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        id: '3',
        name,
        removable: true,
      }),
    );
  }),

  rest.post(`${baseUrl}lists/2/tasks`, (req, res, ctx) => {
    const { text } = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        completed: false,
        id: '20',
        listId: '2',
        text,
        touched: Date.now(),
      }),
    );
  }),

  rest.delete(`${baseUrl}lists/2`, (req, res, ctx) => res(
    ctx.status(204),
  )),
];

export default handlers;
