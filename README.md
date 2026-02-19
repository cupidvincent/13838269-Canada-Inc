# Email Cadence Monorepo

This monorepo contains a TypeScript stack for managing email cadences using Temporal.io workflows. It includes Web (Next.js frontend), API (NestJS backend), and Worker (Temporal worker). It allows creating cadences, enrolling contacts, running workflows, and updating workflows dynamically using Temporal signals.

First, install Temporal.io on your device following the official guide for Windows: https://learn.temporal.io/getting_started/typescript/dev_environment/?os=win

Then install dependencies for each directory:

cd apps/api && npm install  
cd ../web && npm install  
cd ../worker && npm install  
cd ../../ && npm install

To run all apps at once, from the root:

npm run dev

To run web only:

cd apps/web && npm run dev:web

To run API only:

cd apps/api && npm run dev:api

To run worker only:

cd apps/worker && npm run dev:worker

Example API calls:

you can check your workflow ids at http://localhost:8233 or what ever port you are running

Create Cadence: POST /cadences  
Body:
{
"name": "Welcome Flow",
"steps": [
{ "id": 1, "type": "SEND_EMAIL", "subject": "Welcome", "body": "Hello there" },
{ "id": 2, "type": "WAIT", "seconds": 10 },
{ "id": 3, "type": "SEND_EMAIL", "subject": "Follow up", "body": "Checking in" }
]
}

Get Cadence: GET /cadences/:id

Update Cadence: PUT /cadences/:id  
Body: same as create payload

Enroll Contact (Start Workflow): POST /enrollments  
Body:
{
"cadenceId": "cad_123",
"contactEmail": "user@example.com"
}

Get Workflow State: GET /enrollments/:id  
Response example:
{
"currentStepIndex": 1,
"stepsVersion": 2,
"status": "RUNNING",
"steps": [...]
}

Update Running Workflow (Signal): POST /enrollments/:id/update-cadence  
Body:
{
"steps": [
{ "id": 1, "type": "SEND_EMAIL", "subject": "Updated", "body": "New body" },
{ "id": 2, "type": "WAIT", "seconds": 5 }
]
}

⚠️ Only works for workflows with status RUNNING. Completed workflows return:
{
"statusCode": 400,
"message": "Cannot update workflow. Status is COMPLETED",
"error": "Bad Request"
}

Notes: Make sure Temporal server is running locally before starting API or worker. Workflow state is maintained with currentStepIndex, stepsVersion, and status. The monorepo scripts in package.json allow running everything from root (npm run dev) or individually (dev:web, dev:api, dev:worker). Only RUNNING workflows can receive update signals.
