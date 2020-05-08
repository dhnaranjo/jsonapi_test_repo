import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import axios from "axios";

const FancyQuery = () => {
  const [users, setUsers] = useState(null);
  const [query = "", setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!loading) {
      return;
    }
    async function fetchUsers() {
      const response = await axios("/api/users?" + query);
      setUsers(response);
      setLoading(false);
    }
    fetchUsers();
  }, [loading]);

  return (
    <div>
      <input
        style={{ width: "500px" }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setLoading(true)}>Query!</button>
      {users && <ReactJson src={users.data} collapsed={1} />}
    </div>
  );
};

export default FancyQuery;
