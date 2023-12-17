# PHP Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fphp_pipeline&query=%24.version)](https://pkg.fluentci.io/php_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
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
  src: Directory | string | undefined = "."
): Promise<string>
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { test } from "https://pkg.fluentci.io/php_pipeline@v0.5.0/mod.ts";

await test();
```
