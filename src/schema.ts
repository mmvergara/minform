import LiteValidator from "./validator";

type Schema<T> = Record<keyof T, LiteValidator<string | number | Date>>;
class LiteSchema<T> {
  private schema: Schema<T>;

  constructor(schema: Schema<T>) {
    this.schema = schema;
  }

  validate(data: Record<keyof T, string | number | Date>): string[] {
    const errors: string[] = [];
    for (const key in this.schema) {
      if (Object.prototype.hasOwnProperty.call(this.schema, key)) {
        const value = data[key];
        errors.push(...this.schema[key].validate(key, value));
      }
    }
    return errors;
  }
}

export default LiteSchema;
