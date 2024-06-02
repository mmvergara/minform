// @ts-nocheck

import liteString from "../validators/string";
import { describe, it, expect } from "@jest/globals";
import liteString from "./LiteString";

describe("LiteString", () => {
  describe("validate", () => {
    // Test cases for non-string values
    it("should return an error if the value is not a string", () => {
      const validator = liteString();
      const errors = validator.validate("myProperty", 123);
      expect(errors).toContain("myProperty is not a string");
    });

    // Test cases for required validation
    describe("required", () => {
      it("should return an error if the required value is empty", () => {
        const validator = liteString().required();
        const errors = validator.validate("myProperty", "");
        expect(errors).toContain("myProperty is required");
      });

      it("should return no error if the required value is not empty", () => {
        const validator = liteString().required();
        const errors = validator.validate("myProperty", "abc");
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteString().required("Custom required error");
        const errors = validator.validate("myProperty", "");
        expect(errors).toContain("Custom required error");
      });

      it("should only return the required error if the value is empty", () => {
        const validator = liteString().email().min(5).max(20).required();
        const errors = validator.validate("myProperty", "");
        expect(errors).toContain("myProperty is required");
        expect(errors).not.toContain("myProperty is not a valid email");
        expect(errors).not.toContain(
          "myProperty should be atleast 5 characters long"
        );
        expect(errors).not.toContain(
          "myProperty should be atmost 20 characters long"
        );
      });
    });

    // Test cases for email validation
    describe("email", () => {
      it("should return an error if the email is invalid", () => {
        const validator = liteString().email();
        const errors = validator.validate("myProperty", "invalid@email");
        expect(errors).toContain("myProperty is not a valid email");
      });

      it("should return no error if the email is valid", () => {
        const validator = liteString().email();
        const errors = validator.validate("myProperty", "valid@email.com");
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteString().email("Custom email error");
        const errors = validator.validate("myProperty", "invalid@email");
        expect(errors).toContain("Custom email error");
      });
    });

    // Test cases for min length validation
    describe("min", () => {
      it("should return an error if the length is less than the minimum", () => {
        const validator = liteString().min(5);
        const errors = validator.validate("myProperty", "abc");
        expect(errors).toContain(
          "myProperty should be atleast 5 characters long"
        );
      });

      it("should return no error if the length is greater than or equal to the minimum", () => {
        const validator = liteString().min(5);
        const errors = validator.validate("myProperty", "abcde");
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteString().min(5, "Custom min error");
        const errors = validator.validate("myProperty", "abc");
        expect(errors).toContain("Custom min error");
      });
    });

    // Test cases for max length validation
    describe("max", () => {
      it("should return an error if the length is greater than the maximum", () => {
        const validator = liteString().max(5);
        const errors = validator.validate("myProperty", "abcdef");
        expect(errors).toContain(
          "myProperty should be atmost 5 characters long"
        );
      });

      it("should return no error if the length is less than or equal to the maximum", () => {
        const validator = liteString().max(5);
        const errors = validator.validate("myProperty", "abcde");
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteString().max(5, "Custom max error");
        const errors = validator.validate("myProperty", "abcdef");
        expect(errors).toContain("Custom max error");
      });
    });

    // Test case for combined validations
    it("should return no errors if all validations pass", () => {
      const validator = liteString().required().email().min(5).max(20);
      const errors = validator.validate("myProperty", "valid@email.com");
      expect(errors).toHaveLength(0);
    });
  });
});
