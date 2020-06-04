import express, { Request, Response } from 'express'
import { Order, OrderStatus } from '../models/order'
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@bftickets/common'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  const { orderId } = req.params

  const order = await Order.findById(orderId).populate('ticket')

  if (!order) {
    throw new NotFoundError()
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError('Not your order')
  }
  order.status = OrderStatus.Cancelled
  await order.save()

  // publishes an event to update status
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id
    }
  })

  res.status(204).send(order)
})

export { router as deleteOrderRouter }
