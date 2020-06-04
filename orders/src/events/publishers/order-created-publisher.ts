import { Publisher, OrderCreatedEvent, Subjects } from '@bftickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated
}