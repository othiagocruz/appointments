import { type ActionFunction, json, redirect } from "@remix-run/node";
import { supabase } from "~/lib/supabase-client";
import { type Appointment } from "~/models/appointments";

export const create: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const appointment = {
    title: formData.get("title"),
    // Converts date from local to UTC, supabase uses UTC format for timestampz fields
    start: new Date(formData.get("start")?.toString()!).toUTCString(),
    finish: new Date(formData.get("finish")?.toString()!).toUTCString(),
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

  // Check for an appointment where start overlaps
  const { data: startOverlaps } = await supabase
    .from<Appointment>("appointments")
    .select("id")
    .gte("finish", appointment.start!)
    .lte("start", appointment.start!);

  if (startOverlaps?.length! > 0) {
    return json({
      errors: { start: "Start date overlaps with another appointment" },
      values: appointment,
    });
  }

  // Check for an appointment where finish overlaps
  const { data: finishOverlaps } = await supabase
    .from<Appointment>("appointments")
    .select("id")
    .gte("finish", appointment.finish!)
    .lte("start", appointment.finish!);

  if (finishOverlaps?.length! > 0) {
    return json({
      errors: { finish: "Finish date overlaps with another appointment" },
      values: appointment,
    });
  }

  // Check for appointments between provided period
  const { data: betweenOverlaps } = await supabase
    .from<Appointment>("appointments")
    .select("id")
    .gte("start", appointment.start!)
    .lte("finish", appointment.finish!);

  if (betweenOverlaps?.length! > 0) {
    return json({
      errors: {
        finish: "There is another appointment in the period provided",
      },
      values: appointment,
    });
  }
  await supabase.from("appointments").insert([appointment]).single();
  return redirect("/");
};

export const remove: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id");
  await supabase.from("appointments").delete().match({ id });
  return redirect("/");
};
