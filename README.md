<p align="center">
  <img src="package-logo.png" width="200px" align="center" alt="Zod logo" />

</p>
  <p align="center">
    <b>1.8KB</b> Typescript Schema Validation
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
  name: mf.string().min(3).max(30),
  age: mf.number().min(18).max(100),
  email: mf.string().email(),
  password: mf.string().min(8),
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

But the main reason I created this package is to **learn** Github Actions, Changeset, publishing packages to NPM and other more.