import { Form, useActionData, useTransition } from "@remix-run/react";
import { type Appointment } from "~/models/appointments";

export default function AppointmentForm({
  appointment,
}: {
  appointment?: Appointment;
}) {
  const actionData = useActionData();
  const transition = useTransition();
  return (
    <Form method="post">
      <h2>Create new appointment:</h2>
      <fieldset disabled={transition.state === "submitting"}>
        <div>
          <label htmlFor="title">Title</label>{" "}
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={actionData?.values.title}
            required
          />
        </div>
        <div>
          <label htmlFor="start">Start</label>{" "}
          <input
            type="datetime-local"
            id="start"
            name="start"
            defaultValue={actionData?.values.start}
            required
          />
        </div>
        <div>
          <label htmlFor="finish">Finish</label>{" "}
          <input
            type="datetime-local"
            id="finish"
            name="finish"
            defaultValue={actionData?.values.finish}
            required
          />
        </div>
        {actionData?.errors.start ? (
          <p style={{ color: "red" }}>{actionData.errors.start}</p>
        ) : null}
        {actionData?.errors.finish ? (
          <p style={{ color: "red" }}>{actionData.errors.finish}</p>
        ) : null}
        <button type="submit">
          {transition.state === "submitting" ? "Loading..." : "Create"}
        </button>
      </fieldset>
    </Form>
  );
}
