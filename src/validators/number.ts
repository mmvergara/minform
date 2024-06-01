import LiteValidator from "../validator";

type NumberValidation = {
  check: "min" | "max";
  val: number;
  error?: string;
};

class LiteNumber extends LiteValidator<number> {
  private validations: NumberValidation[] = [];

  constructor(typeError: string = "is not a number") {
    super(typeError);
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

    this.validations.forEach((validation) => {
      switch (validation.check) {
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
    });

    return errors;
  }
}
const liteNumber = (typeError?: string) => new LiteNumber(typeError);

export default liteNumber;
