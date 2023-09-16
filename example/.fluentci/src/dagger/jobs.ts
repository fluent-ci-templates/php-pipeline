import Client from "@fluentci.io/dagger";
import { withDevbox } from "https://nix.fluentci.io/v0.4.1/src/dagger/steps.ts";

export enum Job {
  test = "test",
}

export const exclude = [
  "vendor",
  "node_modules",
  ".git",
  ".fluentci",
  ".devbox",
];

export const test = async (client: Client, src = ".") => {
  const context = client.host().directory(src);

  // get MariaDB base image
  const mariadb = client
    .container()
    .from("mariadb:10.11.2")
    .withEnvVariable(
      "MARIADB_USER",
      Deno.env.get("MARIADB_USER") || "homestead"
    )
    .withEnvVariable(
      "MARIADB_PASSWORD",
      Deno.env.get("MARIADB_PASSWORD") || "secret"
    )
    .withEnvVariable("MARIADB_DATABASE", "homestead")
    .withEnvVariable(
      "MARIADB_ROOT_PASSWORD",
      Deno.env.get("MARIADB_ROOT_PASSWORD") || "root"
    )
    .withExposedPort(3306);

  const baseCtr = withDevbox(
    client
      .pipeline(Job.test)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", client.cacheVolume("nix"))
      .withMountedCache("/etc/nix", client.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/vendor", client.cacheVolume("composer-vendor"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withServiceBinding("db", mariadb)
    .withExec(["sh", "-c", "[ -e .env.example ] && cp .env.example .env"])
    .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
    .withExec(["sh", "-c", "devbox run -- php vendor/bin/phpunit"]);

  const result = await ctr.stdout();

  console.log(result);
};

export type JobExec = (client: Client, src?: string) => Promise<void>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run all tests",
};
