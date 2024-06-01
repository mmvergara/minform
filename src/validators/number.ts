import LiteValidator from "../validator";

type NumberValidation =
  | {
      check: "min" | "max";
      val: number;
      error?: string;
    }
  | {
      check: "required";
      error?: string;
    };

class LiteNumber extends LiteValidator<number> {
  private validations: NumberValidation[] = [];

  constructor(typeError: string = "is not a number") {
    super(typeError);
  }

  required(error?: string): this {
    this.validations.unshift({ check: "required", error });
    return this;
  }

  min(minValue: number, error?: string): this {
    this.validations.push({ check: "min", val: minValue, error });
    return this;
  }

  max(maxValue: number, error?: string): this {
    this.validations.push({ check: "max", val: maxValue, error });
    return this;
  }

  validate(propertyName: string, value: number): string[] {
    const errors: string[] = [];
    if (typeof value !== "number") {
      errors.push(`${propertyName} ${this.typeError}`);
      return errors;
    }
    let returnOnRequired = false;
    for (const validation of this.validations) {
      switch (validation.check) {
        case "required":
          if (!value) {
            errors.push(validation.error || `${propertyName} is required`);
            returnOnRequired = true;
          }
          break;
        case "min":
          if (value < validation.val) {
            errors.push(
              validation.error ||
                `${propertyName} should be atleast ${validation.val}`
            );
          }
          break;
        case "max":
          if (value > validation.val) {
            errors.push(
              validation.error ||
                `${propertyName} should be less than ${validation.val}`
            );
          }
          break;
      }
      if (returnOnRequired) return errors;
    }

    return errors;
  }
}
const liteNumber = (typeError?: string) => new LiteNumber(typeError);

export default liteNumber;
