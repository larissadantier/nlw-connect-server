import z from 'zod'

import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { env } from '../env'
import { accessInviteLink } from '../functions/access-invite-link'

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invites/:subscriberId',
    {
      schema: {
        summary: 'Access Invite link and redirects user',
        tags: ['Referral'],
        params: z.object({
          subscriberId: z.string(),
        }),
        response: {
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { subscriberId } = request.params

      await accessInviteLink({ subscriberId })

      const redirectURL = new URL(env.WEB_URL)

      redirectURL.searchParams.set('referrer', subscriberId)

      return reply.redirect(redirectURL.toString(), 302)
    }
  )
}
