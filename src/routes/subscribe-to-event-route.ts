import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribe to event',
        tags: ['Subscriptions'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      console.log(name, email)

      return reply.status(201).send({
        name,
        email,
      })
    }
  )
}
