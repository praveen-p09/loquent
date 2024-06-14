import React, { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function handleSubmit(ev) {
    ev.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );
    if (response.status === 200) {
      alert("Registered successfully");
    } else {
      console.log(response);
      alert("Failed to register");
    }
  }
  return (
    <>
      <form action="" onSubmit={handleSubmit} className="register">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
