import AppointmentList from "../components/appointments-list";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase-client";
import { type Appointment } from "~/models/appointments";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
} from "@remix-run/node";
import AppointmentForm from "~/components/appointments-form";
import { create, remove } from "~/actions/appointments";

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from<Appointment>("appointments").select();

  return json(data);
};

export const action: ActionFunction = async (ev) => {
  switch (ev.request.method) {
    case "POST": {
      return create(ev);
    }
    case "DELETE": {
      return remove(ev);
    }
  }
};

export default function Index() {
  const appointments = useLoaderData<Appointment[]>();
  return (
    <main>
      <AppointmentList appointments={appointments} />
      <AppointmentForm />
    </main>
  );
}
