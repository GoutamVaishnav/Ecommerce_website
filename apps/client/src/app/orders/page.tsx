import { auth } from "@clerk/nextjs/server";
import React from "react";

const Orderpage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const res = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  console.log("Data from endpoint:", data);
  console.log(token);
  return <div>Orderpage</div>;
};

export default Orderpage;
