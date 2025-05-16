# Payment_App

This is a simple web application simulating peer-to-peer payments between users. The app includes a styled and validated frontend payment form, a Node.js Express backend to process payments, and deployment using Docker. It features form validation, image upload, dynamic success/error pages, and fraud detection logic.

## Components

### Frontend
- `form.html`: Payment form including sender, recipient, and payment details.
- CSS and JavaScript: Custom styling and validation logic for interactive inputs.
- `success.html` / `error.html`: Displayed after form submission based on validation results.

### Backend
- `server.js`: Express server with routes to serve the form and handle form submissions.
  - `GET /`: Serves the main payment form.
  - `POST /send`: Processes form data, blocks fraudulent names (e.g., "Stuart Dent" / "Stu Dent"), saves images, and returns dynamic feedback.

### Validation Highlights
- Required fields: Sender/recipient names, card details, image, and message.
- Conditional email/phone requirements based on notification choice.
- Custom image preview and input restrictions (e.g., card format, expiration check, CCV length).
  
## Deployment

### Docker Setup
- `Dockerfile`: Defines a Node.js image and runs the Express app.
- `docker-compose.yml`: Adds a `paymentapp` service for the app.
- `default.conf.template`: Configured to route `/` and `/paymentapp/` traffic to the app container.

### To Deploy Locally:
```bash
docker-compose build paymentapp
docker-compose up
