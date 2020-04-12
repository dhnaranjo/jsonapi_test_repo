export const flattenRelationships = ({ relationships, ...attributes }) => {
  let flattenedRelationships = {};
  Object.entries(relationships).forEach(([key, { data }]) => {
    flattenedRelationships[key] = data;
  });
  return { ...attributes, ...flattenedRelationships };
};

export const flattenRelationshipsOfIncluded = (included) =>
  included.map(flattenRelationships);

const thingReferencer = ({ id, type }, relatable) =>
  relatable.find(
    ({ id: relatableId, type: relatableType }) =>
      id === relatableId && type === relatableType
  );

const singleThingDoer = (reference, relatable) => ({
  get data() {
    return thingReferencer(reference, relatable);
  },
});

const arrayOfThingsDoer = (arr, relatable) => {
  return new Proxy([...arr], {
    get(target, property) {
      if (property in target && !Array.prototype.hasOwnProperty(property)) {
        const reference = target[property];
        return thingReferencer(reference, relatable);
      } else {
        return Reflect.get(target, property);
      }
    },
  });
};

export const thingDoer = (target, relatable) => {
  const { relationships, ...rest } = target;

  const referencedRelationships = {};
  Object.entries(relationships).forEach(([key, { data }]) => {
    let relationship;
    if (!Array.isArray(data)) {
      relationship = singleThingDoer(data, relatable);
    } else {
      relationship = arrayOfThingsDoer(data, relatable);
    }
    referencedRelationships[key] = relationship;
  });

  return { ...rest, relationships: referencedRelationships };
};

const parseJsonApi = (response) => {
  const {
    data: { relationships },
    included,
  } = response;
  const flattenedRelationships = flattenRelationships(relationships);
  return {
    ...response.data.attributes,
    ...flattenedRelationships,
  };
};

export default parseJsonApi;
