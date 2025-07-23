const { google } = require('googleapis');
require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

const getMails = async (req, res) => {
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5,
    });

    const messages = response.data.messages || [];
    const mailDetails = [];

    for (const message of messages) {
      const mail = await gmail.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      mailDetails.push({
        id: mail.data.id,
        snippet: mail.data.snippet,
        from: mail.data.payload.headers.find(h => h.name === 'From')?.value || '',
        subject: mail.data.payload.headers.find(h => h.name === 'Subject')?.value || '',
      });
    }

    res.json(mailDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch mails');
  }
};

module.exports = { getMails };
