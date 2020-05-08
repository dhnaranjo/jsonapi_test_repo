import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";

const RegularQuery = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function fetchUsers() {
      const response = await axios("/api/dumpy_users");
      setUsers(response);
    }
    fetchUsers();
  }, []);

  return users && <ReactJson src={users.data} collapsed={1} />;
};

export default RegularQuery;
