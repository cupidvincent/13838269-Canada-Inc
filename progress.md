# 🚀 Cadence + Enrollment + Temporal Checklist

---

# 🏗 1️⃣ Domain Layer (NestJS API)

## Cadence Management

- [x] Create `CreateCadenceDto`
- [x] Create `UpdateCadenceDto`
- [x] Store cadences (DB or in-memory for now)
- [x] Validate steps (`SEND_EMAIL`, `WAIT`, etc.)
- [x] Ensure steps are ordered correctly

## Enrollment Management

- [x] Create `CreateEnrollmentDto`
- [x] `POST /enrollments`
- [x] Generate unique `workflowId` (ex: `enrollment-${id}`)
- [x] Start Temporal workflow from service
- [ ] Store enrollment record in DB

---

# ⏳ 2️⃣ Temporal Setup

## Infrastructure

- [x] Temporal server running
- [x] Worker running
- [x] Task queue defined
- [x] Workflow registered
- [ ] Activities registered

## Workflow Basics

- [ ] Workflow receives `steps`
- [x] Loop through steps
- [x] Handle `SEND_EMAIL` (activity)
- [x] Handle `WAIT` (sleep timer)
- [ ] Track `currentStepIndex`
- [ ] Complete workflow cleanly

---

# 🔁 3️⃣ Update Cadence via Signal

## Signal Definition

- [ ] Define `updateCadence` signal
- [ ] Register signal handler inside workflow
- [ ] Replace `steps` at runtime
- [ ] Handle step versioning safely

## API Endpoint

- [ ] `POST /enrollments/:id/update-cadence`
- [ ] Get workflow handle
- [ ] Send signal
- [x] Return success response

---

# 🧠 4️⃣ Workflow State Management

Inside workflow, confirm:

- [ ] `steps` stored in workflow state
- [ ] `currentStepIndex` tracked
- [ ] Signal updates do not break determinism
- [ ] Removed future steps handled safely
- [ ] No mutation of completed steps

Optional but impressive:

- [ ] Add `stepsVersion`
- [ ] Log signal receipt

---

# 🖥 5️⃣ Observability (Temporal UI)

You should be able to verify:

- [x] One workflow per enrollment
- [x] Activity events visible
- [ ] Timer events visible
- [ ] Signal events visible
- [ ] Workflow completes properly
- [x] Workflow resumes after worker restart

---

# 🔥 6️⃣ Edge Case Handling

Test these scenarios:

- [ ] Worker crashes during `WAIT`
- [ ] Update cadence while sleeping
- [ ] Update cadence while activity running
- [ ] Remove future steps mid-execution
- [ ] Add new steps mid-execution
- [ ] Multiple signals sent

---

# 🧪 7️⃣ Production-Ready Thinking

Not required, but senior-level:

- [ ] Idempotent email activity
- [ ] Retry policy for activities
- [ ] Timeout configuration
- [ ] WorkflowId reuse strategy
- [ ] Cancellation support
- [ ] Proper error handling

---

# 🎯 Final Milestone

You are done when:

- [ ] You can enroll a contact
- [ ] It appears as 1 workflow in UI
- [ ] It executes steps in order
- [ ] You update cadence via API
- [ ] Signal appears in UI
- [ ] Workflow adapts without restart

✅ That means you built a real long-running business process system.
