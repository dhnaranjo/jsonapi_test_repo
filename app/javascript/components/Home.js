import React, { useState, useEffect } from "react";
import axios from "axios";
import { Router, Link, ServerLocation } from "@reach/router";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

const Wow = () => (
  <div>
    <Link to={"/dang"}>Dang</Link>
  </div>
);

const mapJsonApiElement = (el, included) => {
  const relationships = {};
  for (const key in el.relationships) {
    let relationship = el.relationships[key];
    if (typeof relationship.data === "undefined") {
      return el;
    }
    const mappedRelationship = relationship.data.map((relationEl) => {
      const target = included.find((include) => {
        return include.id === relationEl.id && include.type === relationEl.type;
      });
      return target;
    });
    relationships[key] = { ...relationship, data: mappedRelationship };
  }
  return { ...el, relationships };
};

async function fetchJsonApi(endpoint, params = {}) {
  const {
    data: { data, included },
  } = await axios(endpoint, { params });
  if (Array.isArray(data)) {
    return data.map((el) => mapJsonApiElement(el, included));
  } else {
    return mapJsonApiElement(data, included);
  }
}

const Dang = () => {
  const [users, setUsers] = useState([]);
  const [detailUserPath, setDetailUserPath] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetchJsonApi("/api/users", {
        "fields[user]": "email",
      });
      return response;
    }
    fetchUsers().then(setUsers);
  }, []);

  const closeDetailModal = () => setDetailUserPath(null);

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              openUserDetail={setDetailUserPath}
            />
          ))}
        </tbody>
      </table>
      <UserDetailModal userPath={detailUserPath} onClose={closeDetailModal} />
    </React.Fragment>
  );
};

const UserRow = ({ user, openUserDetail }) => {
  const {
    attributes: { email },
    links: { self },
  } = user;
  return (
    <tr>
      <td>{email}</td>
      <td>
        <button onClick={() => openUserDetail(self)}>!!!</button>
      </td>
    </tr>
  );
};

const useFetchSingleRecord = (recordPath, params = {}) => {
  const [record, setRecord] = useState(null);
  useEffect(() => {
    async function fetchRecord() {
      const response = await fetchJsonApi(recordPath, params);
      return response;
    }
    if (recordPath !== null) {
      fetchRecord().then(setRecord);
    } else {
      setRecord(null);
    }
  }, [recordPath]);

  return record;
};

const UserDetailModal = ({ userPath, onClose }) => {
  const params = {
    include: "things,flavors",
    "fields[user]": "email,role,secret",
    "fields[things]": "kinda",
    "fields[flavors]": "description",
  };
  const user = useFetchSingleRecord(userPath, params);

  const close = () => {
    onClose();
    setUser(null);
  };

  if (user !== null) {
    const {
      attributes: { email, role, secret },
      relationships: { things, flavors },
    } = user;

    const kindaThings = things.data.map((thing) => thing.attributes.kinda);
    const flavorDescriptions = flavors.data.map(
      (flavor) => flavor.attributes.description
    );

    return (
      <Dialog onDismiss={close}>
        <p>Email:</p>
        <p>{email}</p>
        <p>Role:</p>
        <p>{role}</p>
        <p>Kinda Things:</p>
        <p>
          {kindaThings.length > 0
            ? kindaThings.join(", ")
            : "Ain't got no things."}
        </p>
        <p>Flavors:</p>
        <p>{flavorDescriptions.join(", ")}</p>
        {typeof secret !== "undefined" ? (
          <React.Fragment>
            <p>Secret:</p>
            <p>{secret}</p>
          </React.Fragment>
        ) : null}
        <button onClick={close}>Kay.</button>
      </Dialog>
    );
  } else {
    return null;
  }
};

const Home = ({ path }) => (
  <ServerLocation url={path}>
    <Router>
      <Wow path="/" />
      <Dang path="/dang" />
    </Router>
  </ServerLocation>
);

export default Home;
