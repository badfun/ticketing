import { Ticket } from '../ticket'

/**
 * Test the versioning system for concurrency control
 */
it('implements optmistic concurrency control', async (done) => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    })

    // Save the ticket to the database
    await ticket.save()

    // Fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id)
    const secondInstance = await Ticket.findById(ticket.id)

    // Make two separate changes to the tickets we fetched
    firstInstance!.set({price: 10})
    secondInstance!.set({price: 15})

    // Save the first fetched ticket
    await firstInstance!.save()

    // Save the second fetched ticket. Try/Catch used to catch 
    // error and end test.
    try {
        await secondInstance!.save()
    } catch (err){
        return done()
    }

    throw new Error('Test should not reach this point')   
})

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'hello',
        price: 10,
        userId: '123'
    })

    await ticket.save()
    expect(ticket.version).toEqual(0)
    await ticket.save()
    expect(ticket.version).toEqual(1)
    await ticket.save()
    expect(ticket.version).toEqual(2)
})