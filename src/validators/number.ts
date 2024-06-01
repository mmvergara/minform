import LiteValidator from "../validator";

class LiteNumber extends LiteValidator<number> {
  constructor(typeError: string = "is not a number") {
    super(typeError);
  }

  validate(propertyName: string, value: number): string[] {
    const errors: string[] = [];
    if (typeof value !== "number") {
      errors.push(`${propertyName} ${this.typeError}`);
      return errors;
    }

    if (this.validations.max && value > this.validations.max.val) {
      errors.push(
        this.validations.max.error ||
          `${propertyName} should be less than ${this.validations.max.val}`
      );
    }

    if (this.validations.min && value < this.validations.min.val) {
      errors.push(
        this.validations.min.error ||
          `${propertyName} should be greater than ${this.validations.min.val}`
      );
    }

    return errors;
  }
}

export default LiteNumber;
