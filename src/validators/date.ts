import LiteValidator from "../validator";

class LiteDate extends LiteValidator<Date> {
  constructor(typeError: string = "is not a valid date") {
    super(typeError);
  }

  validate(propertyName: string, value: Date): string[] {
    const errors: string[] = [];
    if (isNaN(value.getTime())) {
      errors.push(`${propertyName} ${this.typeError}`);
      return errors;
    }

    if (this.validations.max && value > new Date(this.validations.max.val)) {
      errors.push(
        this.validations.max.error ||
          `${propertyName} should be less than ${new Date(
            this.validations.max.val
          ).toISOString()}`
      );
    }

    if (this.validations.min && value < new Date(this.validations.min.val)) {
      errors.push(
        this.validations.min.error ||
          `${propertyName} should be greater than ${new Date(
            this.validations.min.val
          ).toISOString()}`
      );
    }

    if (this.validations.date && isNaN(value.getTime())) {
      errors.push(this.validations.date.error || "Invalid date format");
    }

    return errors;
  }
}

const liteDate = (typeError?: string) => new LiteDate(typeError);

export default liteDate;
