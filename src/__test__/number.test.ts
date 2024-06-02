// @ts-nocheck

import { describe, it, expect } from "@jest/globals";
import liteNumber from "../validators/number";

describe("LiteNumber", () => {
  describe("validate", () => {
    // Test cases for non-number values
    it("should return an error if the value is not a number", () => {
      const validator = liteNumber();
      const errors = validator.validate("myProperty", "abc");
      expect(errors).toContain("myProperty is not a number");

      const errors2 = validator.validate("myProperty", {});
      expect(errors2).toContain("myProperty is not a number");

      const errors3 = validator.validate("myProperty", []);
      expect(errors3).toContain("myProperty is not a number");

      const errors4 = validator.validate("myProperty", true);
      expect(errors4).toContain("myProperty is not a number");

      const errors5 = validator.validate("myProperty", null);
      expect(errors5).toContain("myProperty is not a number");
    });

    // Test cases for required validation
    describe("required", () => {
      it("should return an error if the required value is 0", () => {
        const validator = liteNumber().required();
        const errors = validator.validate("myProperty", 0);
        expect(errors).toContain("myProperty is required");
      });

      it("should return no error if the required value is non-zero", () => {
        const validator = liteNumber().required();
        const errors = validator.validate("myProperty", 42);
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteNumber().required("Custom required error");
        const errors = validator.validate("myProperty", 0);
        expect(errors).toContain("Custom required error");
      });
    });

    // Test cases for min validation
    describe("min", () => {
      it("should return an error if the value is less than the minimum", () => {
        const validator = liteNumber().min(5);
        const errors = validator.validate("myProperty", 3);
        expect(errors).toContain("myProperty should be atleast 5");
      });

      it("should return no error if the value is greater than or equal to the minimum", () => {
        const validator = liteNumber().min(5);
        const errors = validator.validate("myProperty", 5);
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteNumber().min(5, "Custom min error");
        const errors = validator.validate("myProperty", 3);
        expect(errors).toContain("Custom min error");
      });
    });

    // Test cases for max validation
    describe("max", () => {
      it("should return an error if the value is greater than the maximum", () => {
        const validator = liteNumber().max(10);
        const errors = validator.validate("myProperty", 12);
        expect(errors).toContain("myProperty should be less than 10");
      });

      it("should return no error if the value is less than or equal to the maximum", () => {
        const validator = liteNumber().max(10);
        const errors = validator.validate("myProperty", 10);
        expect(errors).toHaveLength(0);
      });

      it("should return custom error message if provided", () => {
        const validator = liteNumber().max(10, "Custom max error");
        const errors = validator.validate("myProperty", 12);
        expect(errors).toContain("Custom max error");
      });
    });

    // Test case for combined validations
    it("should return no errors if all validations pass", () => {
      const validator = liteNumber().required().min(5).max(10);
      const errors = validator.validate("myProperty", 7);
      expect(errors).toHaveLength(0);
    });
  });
});
