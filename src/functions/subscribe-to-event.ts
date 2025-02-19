import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'

interface ISubscribeToEventParams {
  name: string
  email: string
}

export async function subscribeToEvent({
  name,
  email,
}: ISubscribeToEventParams) {
  const body: typeof subscriptions.$inferInsert = {
    name,
    email,
    createdAt: new Date(),
  }

  const result = await db.insert(subscriptions).values(body).returning()

  const subscriber = result[0]

  return {
    subscriberId: subscriber.id,
  }
}
