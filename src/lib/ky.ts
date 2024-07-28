import ky from "ky";

/**
 * Creates a ky instance with custom JSON parsing logic that converts date strings
 * ending with "At" to Date objects.
 * @param {Object} config - The configuration object for ky instance creation.
 * @returns A ky instance with custom JSON parsing logic.
 */
const kyInstance = ky.create({
  parseJson: (text) =>
    JSON.parse(text, (key, value) => {
      if (key.endsWith("At")) return new Date(value);
      return value;
    }),
});

export default kyInstance;
