import React, { useState } from "react";
import DataTable, { concatRelationshipAttribute } from "./DataTable";
import UserDetailModal from "./UserDetailModal";
import { useFetchHellaRecords } from "../utils/jsonApiStuff";

const buildJsonApiString = (array) => array.filter(Boolean).join(",");

const UsersTable = () => {
  const [flavorsEnabled, setFlavorsEnabled] = useState(false);
  const [fearsEnabled, setFearsEnabled] = useState(false);
  const [users, loading, setLoading] = useFetchHellaRecords("/api/users", {
    include: buildJsonApiString([
      flavorsEnabled && "flavors",
      fearsEnabled && "fears",
    ]),
    "fields[users]": buildJsonApiString([
      "email",
      fearsEnabled && "fears",
      flavorsEnabled && "flavors",
    ]),
    "fields[fears]": "label",
  });
  const [detailUserPath, setDetailUserPath] = useState(null);

  const closeDetailModal = () => setDetailUserPath(null);

  const toggleFlavors = () => {
    setLoading(true);
    setFlavorsEnabled(!flavorsEnabled);
  };

  const toggleFears = () => {
    setLoading(true);
    setFearsEnabled(!fearsEnabled);
  };

  return (
    <React.Fragment>
      <fieldset>
        <legend>Options</legend>
        <label htmlFor="flavorsEnable">
          <input
            type="checkbox"
            checked={flavorsEnabled}
            onChange={toggleFlavors}
          />
          Show flavors?
        </label>
        <label htmlFor="fearsEnable">
          <input
            type="checkbox"
            checked={fearsEnabled}
            onChange={toggleFears}
          />
          Show fears?
        </label>
      </fieldset>
      <DataTable
        data={users}
        loading={loading}
        definition={[
          { label: "Email", attribute: "email" },
          {
            label: "Flavors",
            disabled: !flavorsEnabled,
            dataHandler: (data) =>
              concatRelationshipAttribute(data, "flavors", "description"),
          },
          {
            label: "Fears",
            disabled: !fearsEnabled,
            dataHandler: (data) =>
              concatRelationshipAttribute(data, "fears", "label"),
          },
          {
            label: "View User",
            dataHandler: (data) => (
              <button onClick={() => setDetailUserPath(data.links.self)}>
                Dang{" "}
              </button>
            ),
          },
        ]}
      />
      <UserDetailModal userPath={detailUserPath} onClose={closeDetailModal} />
    </React.Fragment>
  );
};

export default UsersTable;
