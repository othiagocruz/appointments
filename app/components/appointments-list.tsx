import { Form } from "@remix-run/react";
import { useRevalidateOnFocus } from "~/lib/use-revalidate-on-focus";
import { type Appointment } from "~/models/appointments";

// Added this formatter for better displaying the timestampz
const intl = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

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
              {appointment.id} - {appointment.title} - Start:{" "}
              {intl.format(new Date(appointment.start))} - Finish:{" "}
              {intl.format(new Date(appointment.finish))}{" "}
              <input type="hidden" name="id" value={appointment.id} />
              <button type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </>
  );
}
