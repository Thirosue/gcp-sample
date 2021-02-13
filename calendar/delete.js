const { google } = require('googleapis');
const getOAuth2Client = require('./auth');

const eventId = 's6re0to4v15qh83u3629gpa62g';

(async () => {
    console.log('Delete Google Event id: %s', eventId);

    const auth = await getOAuth2Client();

    const calendar = google.calendar({ version: 'v3', auth });
    const response = await calendar.events.delete({
        auth,
        calendarId: 'primary',
        eventId,
    });

    console.log('Event deleted:', response);
})()