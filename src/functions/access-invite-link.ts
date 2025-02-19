import { db } from '../drizzle/client'
import { subscriptions } from '../drizzle/schema/subscriptions'
import { redis } from '../redis/client'

interface IAccessParamsParams {
  subscriberId: string
}

export async function accessInviteLink({ subscriberId }: IAccessParamsParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
