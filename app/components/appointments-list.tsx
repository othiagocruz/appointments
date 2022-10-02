import { useRevalidateOnFocus } from "~/lib/use-revalidate-on-focus";
import { type Appointment } from "~/models/appointments";

export default function AppointmentList({
  appointments,
}: {
  appointments: Appointment[];
}) {
  useRevalidateOnFocus({ enabled: true });
  return (
    <ul>
      {appointments?.map((appointment) => (
        <li key={appointment.id}>
          {appointment.id} - {appointment.title} - {appointment.created_at}
        </li>
      ))}
    </ul>
  );
}
