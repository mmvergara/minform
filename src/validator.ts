// LiteValidator.ts
type ValidationRule = {
  val: number;
  error?: string;
};

interface Validations {
  min?: ValidationRule;
  max?: ValidationRule;
  email?: { error?: string };
  date?: { error?: string };
}

abstract class LiteValidator<T> {
  protected validations: Validations = {};
  protected typeError: string;

  constructor(typeError: string) {
    this.typeError = typeError;
  }

  min(val: number, error?: string): this {
    this.validations.min = { val, error };
    return this;
  }

  max(val: number, error?: string): this {
    this.validations.max = { val, error };
    return this;
  }

  abstract validate(propertyName: string, value: T): string[];
}

export default LiteValidator;
