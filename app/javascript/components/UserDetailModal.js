import { concatRelationshipAttribute } from "./DataTable";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React from "react";
import { useFetchSingleRecord } from "../utils/jsonApiStuff";

const UserDetailModal = ({ userPath, onClose }) => {
  const params = {
    include: "things,flavors",
    "fields[user]": "email,role,secret,avatar",
    "fields[things]": "kinda,description",
    "fields[flavors]": "description",
  };
  const user = useFetchSingleRecord(userPath, params);

  const close = () => {
    onClose();
  };

  if (user !== null) {
    const {
      attributes: { email, role, secret, avatar },
      relationships: { things, flavors },
    } = user;

    const thingDescriptions = concatRelationshipAttribute(
      user,
      "things",
      "description",
      {
        fallback: "Ain't got no things.",
      }
    );
    const kindaThings = concatRelationshipAttribute(user, "things", "kinda", {
      fallback: "Ain't got no things.",
    });
    const flavorDescriptions = concatRelationshipAttribute(
      user,
      "flavors",
      "description"
    );

    return (
      <Dialog onDismiss={close}>
        <img src={avatar} />
        <p>Email: {email}</p>
        <p>Role: {role}</p>
        <p>Things: {thingDescriptions}</p>
        <p>Kinda Things: {kindaThings}</p>
        <p>Flavors: {flavorDescriptions}</p>
        {typeof secret !== "undefined" ? <p>Secret: {secret}</p> : null}
        <button onClick={close}>Kay.</button>
      </Dialog>
    );
  } else {
    return null;
  }
};

export default UserDetailModal;
