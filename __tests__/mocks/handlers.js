import {rest} from 'msw';

export const handlers = [
  rest.get('http://localhost/',
    (req, res, ctx) => {
      return res(ctx.status(200))
    }),

  rest.post('http://localhost/api/v1/lists/1/tasks', (req, res, ctx) => {
    const {text} = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        completed: false,
        id: '20',
        listId: '1',
        text: text,
        touched: Date.now(),
      })
    )
  }),

  rest.delete('http://localhost/api/v1/tasks/20', (req, res, ctx) => {
    return res(
      ctx.status(204),
    )
  }),
  
  rest.patch('http://localhost/api/v1/tasks/20', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        completed: true,
        id: '20',
        listId: '1',
        text: 'test',
        touched: Date.now(),
      })
    )
  })
]