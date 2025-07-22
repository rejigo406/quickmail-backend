const { google } = require('googleapis');
require('dotenv').config();

const OAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

OAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const gmail = google.gmail({ version: 'v1', auth: OAuth2Client });

exports.getMails = async (req, res) => {
    try {
        const response = await gmail.users.messages.list({
            userId: 'me',
            labelIds: ['Label_quickmail'],
            maxResults: 20,
        });

        const messages = response.data.messages || [];
        const mailDetails = [];

        for (const message of messages) {
            const mail = await gmail.users.messages.get({
                userId: 'me',
                id: message.id,
            });

            mailDetails.push({
                id: message.id,
                snippet: mail.data.snippet,
                headers: mail.data.payload.headers.reduce((acc, header) => {
                    acc[header.name] = header.value;
                    return acc;
                }, {}),
            });
        }

        res.status(200).json(mailDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
