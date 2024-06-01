import LiteValidator from "../validator";

class LiteString extends LiteValidator<string> {
  private emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  constructor(typeError: string = "is not a string") {
    super(typeError);
  }

  email(error?: string): this {
    this.validations.email = { error };
    return this;
  }

  validate(propertyName: string, value: string): string[] {
    const errors: string[] = [];
    if (typeof value !== "string") {
      errors.push(`${propertyName} ${this.typeError}`);
      return errors;
    }

    if (this.validations.max && value.length > this.validations.max.val) {
      errors.push(
        this.validations.max.error ||
          `${propertyName} should be less than ${this.validations.max.val}`
      );
    }

    if (this.validations.min && value.length < this.validations.min.val) {
      errors.push(
        this.validations.min.error ||
          `${propertyName} should be greater than ${this.validations.min.val}`
      );
    }

    if (this.validations.email && !this.emailRegex.test(value)) {
      errors.push(this.validations.email.error || "Invalid email format");
    }

    return errors;
  }
}
const liteString = (typeError?: string) => new LiteString(typeError);

export default liteString;
