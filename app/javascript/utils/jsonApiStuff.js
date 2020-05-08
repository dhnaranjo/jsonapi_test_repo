import axios from "axios";
import {useEffect, useState} from "react";
import useDeepCompareEffect from "use-deep-compare-effect";

export const mapJsonApiElement = (el, included) => {
    const relationships = {};
    for (const key in el.relationships) {
        let relationship = el.relationships[key];
        if (typeof relationship.data !== "undefined") {
            const mappedRelationship = relationship.data.map((relationEl) => {
                const target = included.find((include) => {
                    return include.id === relationEl.id && include.type === relationEl.type;
                });
                return target;
            });
            relationships[key] = { ...relationship, data: mappedRelationship };
        } else {
            relationships[key] = relationship;
        }
    }
    return { ...el, relationships };
};

export async function fetchJsonApi(endpoint, params = {}) {
    const {
        data: { data, included },
    } = await axios(endpoint, { params });
    if (Array.isArray(data)) {
        return data.map((el) => mapJsonApiElement(el, included));
    } else {
        return mapJsonApiElement(data, included);
    }
}

export const useFetchSingleRecord = (recordPath, params = {}) => {
    const [record, setRecord] = useState(null);
    useDeepCompareEffect(() => {
        async function fetchRecord() {
            const response = await fetchJsonApi(recordPath, params);
            return response;
        }
        if (recordPath !== null) {
            fetchRecord().then(setRecord);
        } else {
            setRecord(null);
        }
    }, [recordPath, params]);

    return record;
};

export const useFetchHellaRecords = (recordPath, params) => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useDeepCompareEffect(() => {
        async function fetchHellaRecords() {
            setLoading(true);
            const response = await fetchJsonApi(recordPath, params);
            setRecords(response);
            setLoading(false);
        }
        fetchHellaRecords();
    }, [recordPath, params])
    
    return [records, loading, setLoading];
}
// useEffect(() => {
//     async function fetchUsers() {
//         const response = await fetchJsonApi("/api/users", {
//             // "fields[user]": "email",
//             include: "things,flavors",
//         });
//         return response;
//     }
//     fetchUsers().then(setUsers);
// }, []);
