import React from "react";

export const concatRelationshipAttribute = (
  data,
  relationship,
  attribute,
  options = {}
) => {
  const { separator = ", ", fallback = "" } = options;
  const relationshipData = data.relationships[relationship].data.map(
    (element) => element.attributes[attribute]
  );
  return relationshipData.length > 0
    ? relationshipData.join(separator)
    : fallback;
};

const ColHeading = ({ label, disabled }) =>
  !disabled ? <th key={label}>{label}</th> : null;

const ColContent = ({ data, colDefinition }) => {
  const { attribute, dataHandler } = colDefinition;
  if (dataHandler) {
    return <td>{dataHandler(data)}</td>;
  } else {
    return <td>{data.attributes[attribute]}</td>;
  }
};

const Row = ({ data, definition }) => {
  return (
    <tr key={data.id}>
      {definition.map((colDefinition) =>
        !colDefinition.disabled ? (
          <ColContent
            key={`${colDefinition.label}-${data.id}`}
            data={data}
            colDefinition={colDefinition}
          />
        ) : null
      )}
    </tr>
  );
};

const DataTable = ({ data = [], definition, loading = false }) => {
  return loading ? null : (
    <table>
      <thead>
        <tr>{definition.map(ColHeading)}</tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <Row key={row.id} data={row} definition={definition} />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
