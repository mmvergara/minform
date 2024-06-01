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
    };

class LiteString extends LiteValidator<string> {
  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  private validations: StringValidation[] = [];

  constructor(typeError: string = "is not a string") {
    super(typeError);
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

    this.validations.forEach((validation) => {
      switch (validation.check) {
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
    });

    return errors;
  }
}
const liteString = (typeError?: string) => new LiteString(typeError);

export default liteString;
