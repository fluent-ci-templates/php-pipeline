use std::vec;

use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_php;

pub mod helpers;

#[plugin_fn]
pub fn setup(version: String) -> FnResult<String> {
    let stdout = setup_php(version)?;
    Ok(stdout)
}

#[plugin_fn]
pub fn composer_install(args: String) -> FnResult<String> {
    let version = dag().get_env("PHP_VERSION").unwrap_or_default();

    setup_php(version)?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox", "run", "--", "composer", "install", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let version = dag().get_env("PHP_VERSION").unwrap_or_default();

    setup_php(version)?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["[ -e .env.example ] && cp .env.example .env"])?
        .with_exec(vec![
            "devbox",
            "run",
            "--",
            "php",
            "vendor/bin/phpunit",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
