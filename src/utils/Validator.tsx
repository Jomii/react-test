export enum FieldType {
  Required = "REQUIRED",
  Email = "EMAIL",
  Phone = "PHONE",
}

export const validate = (fieldValue: string, type: FieldType): boolean => {
  let isValid = false;

  switch (type) {
    case FieldType.Required:
      isValid = required(fieldValue);
      break;
    case FieldType.Phone:
      isValid = isPhone(fieldValue);
      break;
    case FieldType.Email:
      isValid = isEmail(fieldValue);
      break;
    default:
      break;
  }

  return isValid;
};

const required = (fieldValue: string): boolean => {
  if (fieldValue === undefined || fieldValue === null || fieldValue === "") {
    return false;
  }

  return true;
};

const isPhone = (fieldValue: string): boolean => {
  let phoneNum = /^\d{10}$/;

  if (!fieldValue.match(phoneNum)) return false;

  return true;
}

const isEmail = (fieldValue: string): boolean => {
  let email = /^\S+@\S+$/

  if (!fieldValue.match(email)) return false;

  return true;
}
