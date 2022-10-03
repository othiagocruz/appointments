import { Form } from "@remix-run/react";
import { useRevalidateOnFocus } from "~/lib/use-revalidate-on-focus";
import { type Appointment } from "~/models/appointments";

export default function AppointmentList({
  appointments,
}: {
  appointments: Appointment[];
}) {
  useRevalidateOnFocus({ enabled: true });
  return (
    <>
      <h1>Appointments</h1>
      <ul>
        {appointments?.map((appointment) => (
          <li key={appointment.id}>
            <Form method="delete">
              {appointment.id} - {appointment.title} - {appointment.start} -{" "}
              {appointment.finish}{" "}
              <input type="hidden" name="id" value={appointment.id} />
              <button type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </>
  );
}
