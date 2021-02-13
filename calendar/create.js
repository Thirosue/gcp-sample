const { google } = require('googleapis');
const moment = require('moment');
const getOAuth2Client = require('./auth');

const event = {
    'summary': 'サンプル',
    'description': 'カレンダー説明',
    'start': {
        'dateTime': moment().add(1, 'h').format(),
        'timeZone': 'Asia/Tokyo',
    },
    'end': {
        'dateTime': moment().add(2, 'h').format(),
        'timeZone': 'Asia/Tokyo',
    },
    'colorId': 2, // @see https://lukeboyle.com/blog-posts/2016/04/google-calendar-api---color-id
    'reminders': {
        'useDefault': false,
        'overrides': [
            { 'method': 'email', 'minutes': 120 },
            { 'method': 'popup', 'minutes': 30 },
        ],
    },
};

(async () => {
    console.log('Create Event captured:');
    console.log(event);

    const auth = await getOAuth2Client();

    const calendar = google.calendar({ version: 'v3', auth });
    const response = await calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: event,
    });

    console.log('Event created:', response);
})()