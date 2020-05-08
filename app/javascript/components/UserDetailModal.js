import {concatRelationshipAttribute} from "./DataTable";
import {Dialog} from "@reach/dialog";
import "@reach/dialog/styles.css";
import React from "react";
import {useFetchSingleRecord} from "../utils/jsonApiStuff";

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
    };

    if (user !== null) {
        const {
            attributes: { email, role, secret },
            relationships: { things, flavors },
        } = user;

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
                <p>Email:</p>
                <p>{email}</p>
                <p>Role:</p>
                <p>{role}</p>
                <p>Kinda Things:</p>
                <p>{kindaThings}</p>
                <p>Flavors:</p>
                <p>{flavorDescriptions}</p>
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

export default UserDetailModal;