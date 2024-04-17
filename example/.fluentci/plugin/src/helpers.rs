use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_php(version: String) -> Result<String, Error> {
    let mut version = version;
    if version.is_empty() {
        version = "8.3.4".into();
    }

    let stdout = dag()
        .devbox()?
        .with_exec(vec!["[ -f  devbox.json ] || devbox init"])?
        .with_exec(vec![&format!(
            "grep -q 'php' devbox.json || devbox add php@{} php83Packages.composer@latest",
            version
        )])?
        .stdout()?;
    Ok(stdout)
}
