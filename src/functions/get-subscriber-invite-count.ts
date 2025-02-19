import { redis } from '../redis/client'

interface IGetSubscriberInviteCountParams {
  subscriberId: string
}

export async function getSubscriberInviteCount({
  subscriberId,
}: IGetSubscriberInviteCountParams) {
  const count = await redis.zscore('referral:ranking', subscriberId)

  return {
    count: count ? Number.parseInt(count) : 0,
  }
}
