import AppointmentList from "../components/appointments-list";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/lib/supabase-client";
import { type Appointment } from "~/models/appointments";
import {
  type ActionFunction,
  json,
  type LoaderFunction,
  redirect,
} from "@remix-run/node";
import AppointmentForm from "~/components/appointments-form";

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from<Appointment>("appointments").select();

  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const appointment = {
    title: formData.get("title"),
    start: formData.get("start")?.toString(),
    finish: formData.get("finish")?.toString(),
  };

  // This validation could also be done on database side with postgres check constrains
  // Did here to keep the test requirements in the same place
  const start = new Date(appointment.start!);
  const finish = new Date(appointment.finish!);
  if (start > finish) {
    return json({
      errors: { start: "Start date is bigger than finish" },
      values: appointment,
    });
  }
  await supabase.from("appointments").insert([appointment]).single();
  return redirect("/");
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
