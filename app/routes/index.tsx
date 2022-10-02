import AppointmentList from "../components/appointments-list";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase-client";
import { type Appointment } from "~/models/appointments";
import { json, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from<Appointment>("appointments").select();

  return json(data);
};

export default function Index() {
  const appointments = useLoaderData<Appointment[]>();
  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentList appointments={appointments} />
    </div>
  );
}
