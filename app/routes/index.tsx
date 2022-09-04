import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const loader = () => {
  return json({
    url: process.env.SUPABASE_URL!,
    token: process.env.SUPABASE_TOKEN!
  })
}

interface Appointment {
  id: number
}

export default function Index() {
  const { url, token } = useLoaderData<typeof loader>()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const supabaseClient = createClient(url, token)

  useEffect(() => {
    supabaseClient.from<Appointment>('appointments').select().then((response) => {
      if (response.error) {
        console.error('Error fetching appointments', response.error)
        return
      }

      if (!response.data) {
        console.error('No appointments found')
        return
      }

      setAppointments(response.data)
    })
  }, [supabaseClient])

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments?.map((appointment) => <li key={appointment.id}>{appointment.id}</li>)}
      </ul>
    </div>
  );
}
