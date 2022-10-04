import { Form, useSearchParams } from "@remix-run/react";

export default function AppointmentsFilter() {
  const [params] = useSearchParams();
  return (
    <Form method="get" action="/">
      <h2>Filter appointments</h2>
      <div>
        <label htmlFor="tt">Search by title:</label>{" "}
        <input
          id="t"
          name="t"
          type="text"
          placeholder="Title"
          defaultValue={params.get("t")!}
        />
      </div>
      <div>
        <label htmlFor="start">Order by:</label>{" "}
        <select id="order" name="order" defaultValue={params.get("order")!}>
          <option value="title">Title</option>
          <option value="start">Start</option>
          <option value="finish">Finish</option>
        </select>
      </div>

      <button type="submit">Filter</button>
    </Form>
  );
}
