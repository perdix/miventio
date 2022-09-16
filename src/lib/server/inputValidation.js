
import Ajv from 'ajv';
import addFormats from "ajv-formats"
const ajv = new Ajv()
addFormats(ajv)

const loginInputSchema = {
  type: "object",
  properties: {
    email: {
        type: "string",
        format: "email"
    },
    password: {
        type: "string"
    }
  },
  required: ["email", "password"],
  additionalProperties: false
}


export class InputValidator {
  validateLoginInput = (data) => {
    const validate = ajv.compile(loginInputSchema)
    return validate(data);
  }
}
