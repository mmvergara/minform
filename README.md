## Minform

[![NPM Version](https://img.shields.io/npm/v/minform?logo=npm&labelColor=cb0000&color=black)](https://www.npmjs.com/package/minform)
![npm bundle size](https://img.shields.io/bundlephobia/min/minform?label=BundlePhobia&labelColor=blackn&color=gree)

<p align="center">
  <img src="package-logo.png" width="200px" align="center" />
</p>

  <p align="center">
    <b>2.2KB </b> Typescript Schema Validation - Zod alternative
  </p>

---

## Table of contents

- [Installation](#installation)
- [Basic Usage](#usage)
- [Motivation](#motivation)

## Installation

> You need to have `typescript` installed in your project

```bash
npm install minform
yarn add minform
pnpm add minform
bun add minform
```

## Basic Usage

```typescript
import mf from "minform";

type User = {
  name: string;
  age: number;
  email: string;
  password: string;
};

const schema = mf.schema<User>({
  name: mf.string().min(3).max(30, "my custom error").required(),
  age: mf.number().min(18, "my custom error").max(100).required(),
  email: mf.string().email("my custom error").required(),
  password: mf.string().min(8).required("my custom error"),
});

// string[]
const arrayOfErrorMessages = schema.validate({
  name: "John Doe",
  email: "johndoe@gmail.com",
  age: 25,
  password: "12345678",
});
```

## Motivation

There are a lot of **powerful** validation packages out there but sometimes you don't need all that power, you just need something simple and lightweight for your simple forms.

But the main reason I created this package is to **learn** Github Actions, Changeset, Jest Testing, publishing packages to NPM and other more.
