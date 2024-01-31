import { dag } from "../../deps.ts";
import { Directory } from "../../sdk/client.gen.ts";
import { withDevbox } from "../../sdk/nix/index.ts";
import { getDirectory } from "./lib.ts";

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

/**
 * @function
 * @description Run all tests
 * @param {string | Directory} src
 * @returns {string}
 */
export async function test(
  src: Directory | string | undefined = "."
): Promise<string> {
  const context = await getDirectory(dag, src);

  // get MariaDB base image
  const mariadb = dag
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
    .withExposedPort(3306)
    .asService();

  const baseCtr = withDevbox(
    dag
      .pipeline(Job.test)
      .container()
      .from("alpine:latest")
      .withExec(["apk", "update"])
      .withExec(["apk", "add", "bash", "curl"])
      .withMountedCache("/nix", dag.cacheVolume("nix"))
      .withMountedCache("/etc/nix", dag.cacheVolume("nix-etc"))
  );

  const ctr = baseCtr
    .withMountedCache("/app/vendor", dag.cacheVolume("composer-vendor"))
    .withDirectory("/app", context, { exclude })
    .withWorkdir("/app")
    .withServiceBinding("db", mariadb)
    .withExec(["sh", "-c", "[ -e .env.example ] && cp .env.example .env"])
    .withExec(["sh", "-c", "devbox run -- composer install --no-interaction"])
    .withExec(["sh", "-c", "devbox run -- php vendor/bin/phpunit"]);

  const result = await ctr.stdout();
  return result;
}

export type JobExec = (src?: Directory | string) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.test]: test,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.test]: "Run all tests",
};
