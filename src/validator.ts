abstract class LiteValidator<T> {
  protected typeError: string;
  constructor(typeError: string) {
    this.typeError = typeError;
  }
  abstract validate(propertyName: string, value: T): string[];
}

export default LiteValidator;
