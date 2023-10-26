// pages/index.js

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/user")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <div>
      <h1>Welcome to the Spotify Auth Example</h1>
      {user ? (
        <div>
          <p>Hello, {user.display_name}!</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Please login with Spotify to see your information.</p>
      )}
    </div>
  );
}
