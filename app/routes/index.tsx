import AppointmentList from "~/components/appointments-list";
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
import AppointmentsFilter from "~/components/appointments-filter";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search);

  let query = supabase.from<Appointment>("appointments").select();

  const order = search.get("order")! as keyof Appointment;
  if (order) {
    query.order(order, { ascending: false }); // added ascending for better confirmation of the requirement
  }
  const title = search.get("t")! as keyof Appointment;
  if (title) {
    query.like("title", title);
  }

  const { data } = await query;

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
      <AppointmentsFilter />
      <AppointmentForm />
    </main>
  );
}
