# Ofry's mail app
<a href="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/1.png"><img src="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/1.png" width="20%" /></a>
<a href="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/2.png"><img src="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/2.png" width="20%" /></a>
<a href="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/3.png"><img src="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/3.png" width="20%" /></a>
<a href="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/4.png"><img src="https://raw.githubusercontent.com/OfryL/email-client/refs/heads/master/screenshots/4.png" width="20%" /></a>

[click image to enlarge]

This app is a mail app, where the user can login and see his emails, filter by date, see the labels usage in a nice chart, and add new labels to email. 

## Running
To run the project ensure you have a working `.env` file then run:
```bash
npm install && npm run dev
```
then open `http://localhost:3000`.

## Backend API
### GET /api/v1/emails
Use this endpoint to retrieve emails
#### params
*forDate* - set a date to get emails for a specific day, default is Today's date.

### GET /api/v1/folders
Endpoint for getting all user's labels.

### GET /api/v1/login
Endpoint for redirecting user to the SSO login flow.

### PUT /api/v1/messages/[id]
Use the endpoint to save labels on mail.

#### params
*id* - email id

#### body
*folders* - array of floder's ids to set.

### GET /api/v1/oauth
Callback endpoint for the login flow to end with. 

## FAQ and thoughts
- I used Nylas as my mail integration.
- Deleting labels is not implemented yet.
- Design is minimal to allow basic functionality.
- I used Next.js for a fast MVP but the FE and BE can be separated easily.
- Basic cache was used for the labels fetching to reduce load on the api.
- This project was a nice *mail app* POC
- Thanks for reading 😊
