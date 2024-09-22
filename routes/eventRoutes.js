const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.get('/:companyId/events', async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: 'companyId is required' });
    }
    try {
        const events = await Event.find({ companyId });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});

router.get('/:companyId/events/:eventId', async (req, res) => {
    const { companyId, eventId } = req.params;
    if (!companyId || !eventId) {
        return res.status(400).json({ message: 'companyId and eventId are required' });
    }
    try {
        const event = await Event.findOne({ _id: eventId, companyId });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Failed to fetch event' });
    }
});

router.post('/:companyId/events', async (req, res) => {
    const {
        eventType = '',
        inclusions = [],
        allowed = [],
        notAllowed = [],
        petFriendly = false,
        coupleFriendly = false,
        indoor = false,
        startDate = new Date(),
        endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        price = null,
        numberOfDays = 1,
        description = '',
        itinerary = [''],
        address = '',
        nearby = '',
        city = '',
        state = '',
        country = '',
        googleMapLink = ''
    } = req.body;
    const { companyId } = req.params;

    if (!companyId) {
        return res.status(400).json({ message: 'companyId is required' });
    }

    if (!eventType) {
        return res.status(400).json({ message: 'Event Type is required' });
    }
    if (!startDate) {
        return res.status(400).json({ message: 'Start Date is required' });
    }
    if (price === undefined || price === null) {
        return res.status(400).json({ message: 'Price is required' });
    }

    if (isNaN(new Date(startDate).getTime())) {
        return res.status(400).json({ message: 'Start Date is not a valid date' });
    }
    if (isNaN(new Date(endDate).getTime())) {
        return res.status(400).json({ message: 'End Date is not a valid date' });
    }

    try {
        const newEvent = new Event({
            eventType: Array.isArray(eventType) ? eventType : [eventType], // Ensure eventType is an array
            inclusions,
            allowed,
            notAllowed,
            petFriendly,
            coupleFriendly,
            indoor,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            price,
            numberOfDays,
            description,
            itinerary,
            address,
            nearby,
            city,
            state,
            country,
            googleMapLink,
            companyId
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error adding event:', error);
        res.status(500).json({ message: 'Failed to add event', error: error.message });
    }
});


router.put('/:companyId/events/:eventId', async (req, res) => {
    const { companyId, eventId } = req.params;
    const updatedData = req.body;

    if (!companyId || !eventId) {
        return res.status(400).json({ message: 'companyId and eventId are required' });
    }

    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: eventId, companyId },
            updatedData,
            { new: true }
        );
        if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).json({ message: 'Failed to update event', error: error.message });
    }
});

router.delete('/:companyId/events/:eventId', async (req, res) => {
    const { companyId, eventId } = req.params;

    if (!companyId || !eventId) {
        return res.status(400).json({ message: 'companyId and eventId are required' });
    }

    try {
        const result = await Event.findOneAndDelete({ _id: eventId, companyId });
        if (!result) return res.status(404).json({ message: 'Event not found' });
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: 'Failed to delete event', error: error.message });
    }
});

module.exports = router;
