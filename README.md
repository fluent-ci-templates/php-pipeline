# PHP Pipeline

[![fluentci pipeline](https://shield.fluentci.io/x/php_pipeline)](https://pkg.fluentci.io/php_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.42)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/php-pipeline)](https://codecov.io/gh/fluent-ci-templates/php-pipeline)

A ready-to-use Pipeline for your PHP projects.

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run php_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t php
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Dagger Module

Use as a [Dagger](https://dagger.io) module:

```bash
dagger mod install github.com/fluent-ci-templates/php-pipeline@mod
```

## Environment variables

| Variable               | Description                                | Default |
| ---------------------- | ------------------------------------------ | ------------- |
|`MARIADB_USER`          | The username for the MariaDB database      | `homestead`        |
|`MARIADB_PASSWORD`      | The password for the MariaDB database      | `secret`    |
|`MARIADB_ROOT_PASSWORD` | The root password for the MariaDB database | `root`        |

## Jobs

| Job       | Description   |
| --------- | ------------- |
| test      | Run tests     |

```typescript
test(
  src?: Directory | string
): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { test } from "jsr:@fluentci/php";

await test();
```
