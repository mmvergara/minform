import LiteValidator from "../validator";

type StringValidation =
  | {
      check: "email";
      error?: string;
    }
  | {
      check: "min" | "max";
      val: number;
      error?: string;
    }
  | {
      check: "required";
      error?: string;
    };

class LiteString extends LiteValidator<string> {
  private validations: StringValidation[] = [];
  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  constructor(typeError: string = "is not a string") {
    super(typeError);
  }

  required(error?: string): this {
    this.validations.unshift({ check: "required", error });
    return this;
  }

  email(error?: string): this {
    this.validations.push({ check: "email", error });
    return this;
  }

  min(minLength: number, error?: string): this {
    this.validations.push({ check: "min", val: minLength, error });
    return this;
  }

  max(maxLength: number, error?: string): this {
    this.validations.push({ check: "max", val: maxLength, error });
    return this;
  }

  validate(propertyName: string, value: string): string[] {
    const errors: string[] = [];
    if (typeof value !== "string") {
      errors.push(`${propertyName} ${this.typeError}`);
      return errors;
    }
    let returnOnRequired = false;
    for (const validation of this.validations) {
      if (!validation) break;
      switch (validation.check) {
        case "required":
          if (!value) {
            errors.push(validation.error || `${propertyName} is required`);
            returnOnRequired = true;
          }
          break;
        case "email":
          if (!this.emailRegex.test(value)) {
            errors.push(
              validation.error || `${propertyName} is not a valid email`
            );
          }
          break;
        case "min":
          if (value.length < validation.val) {
            errors.push(
              validation.error ||
                `${propertyName} should be atleast ${validation.val} characters long`
            );
          }
          break;
        case "max":
          if (value.length > validation.val) {
            errors.push(
              validation.error ||
                `${propertyName} should be atmost ${validation.val} characters long`
            );
          }
          break;
      }
      if (returnOnRequired) return errors;
    }
    return errors;
  }
}
const liteString = (typeError?: string) => new LiteString(typeError);

export default liteString;
