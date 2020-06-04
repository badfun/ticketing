import { Publisher, OrderCancelledEvent, Subjects } from '@bftickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}