import React, { useState, useEffect } from "react";
import DataTable, { concatRelationshipAttribute } from "./DataTable";
import UserDetailModal from "./UserDetailModal";
import {useFetchHellaRecords} from "../utils/jsonApiStuff";

const Home = () => {
  const [flavorsEnabled, setFlavorsEnabled] = useState(false);
  const [users, loading, setLoading] = useFetchHellaRecords("/api/users", {
    include: [
      flavorsEnabled ? 'flavors' : null,
    ].filter(Boolean).join(',')
  })
  const [detailUserPath, setDetailUserPath] = useState(null);

  const closeDetailModal = () => setDetailUserPath(null);
  
  const toggleFlavors = () => {
    setLoading(true);
    setFlavorsEnabled(!flavorsEnabled);
  }
  return (
    <React.Fragment>
      <fieldset>
        <legend>Options</legend>
        <label htmlFor="flavorsEnable"><input type="checkbox" checked={flavorsEnabled} onChange={toggleFlavors}/>Show flavors?</label>
      </fieldset>
      <DataTable
        data={users}
        loading={loading}
        definition={[
          {label: "Email", attribute: "email"},
          {
            label: "Flavors",
            disabled: !flavorsEnabled,
            dataHandler: data => concatRelationshipAttribute(data, "flavors", "description")
          },
          {
            label: "View User",
            dataHandler: data => <button onClick={() => setDetailUserPath(data.links.self)}>Dang </button>,
          }
        ]}
      />
      <UserDetailModal userPath={detailUserPath} onClose={closeDetailModal} />
    </React.Fragment>
  );
};

export default Home;
