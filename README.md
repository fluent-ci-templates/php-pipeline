# PHP Pipeline

[![deno module](https://shield.deno.dev/x/php_pipeline)](https://deno.land/x/php_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/php-pipeline)](https://codecov.io/gh/fluent-ci-templates/php-pipeline)

A ready-to-use Pipeline for your PHP projects.

## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci php_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t php
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Environment variables

| Variable               | Description                                | Default |
| ---------------------- | ------------------------------------------ | ------------- |
|`MARIADB_USER`          | The username for the MariaDB database      | `homestead`        |
|`MARIADB_PASSWORD`      | The password for the MariaDB database      | `homestead`    |
|`MARIADB_ROOT_PASSWORD` | The root password for the MariaDB database | `root`        |

## Jobs

| Job       | Description   |
| --------- | ------------- |
| test      | Run tests     |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://deno.land/x/php_pipeline/mod.ts";

const { test } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await test(client, src);
  });
}

pipeline();
```
