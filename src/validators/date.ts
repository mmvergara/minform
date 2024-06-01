import LiteValidator from "../validator";

type DateValidation =
  | {
      check: "min" | "max";
      val: Date;
      error?: string;
    }
  | {
      check: "atLeast18";
      error?: string;
    }
  | {
      check: "required";
      error?: string;
    };

class LiteDate extends LiteValidator<Date> {
  private validations: DateValidation[] = [];
  private static date18YearsAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 18)
  );

  constructor(typeError: string = "is not a valid date") {
    super(typeError);
  }

  required(error?: string): this {
    this.validations.unshift({ check: "required", error });
    return this;
  }

  min(minDate: Date, error?: string): this {
    this.validations.push({ check: "min", val: minDate, error });
    return this;
  }

  max(maxDate: Date, error?: string): this {
    this.validations.push({ check: "max", val: maxDate, error });
    return this;
  }

  atLeast18(error?: string): this {
    this.validations.push({ check: "atLeast18", error });
    return this;
  }

  validate(propertyName: string, value: Date): string[] {
    const errors: string[] = [];
    if (!(value instanceof Date)) {
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
        case "atLeast18":
          if (value > LiteDate.date18YearsAgo) {
            errors.push(
              validation.error ||
                `${propertyName} should be atleast 18 years old`
            );
          }
          break;
      }
      if (returnOnRequired) return errors;
    }

    return errors;
  }
}

const liteDate = () => new LiteDate();

export default liteDate;
