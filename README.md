# axion-vps

## Overview

axion-vps is maintained as a production-ready release copy generated from the SANDBOX workspace.

## Repository role

- Bucket: `apps`
- Project kind: `static-copy`
- Release strategy: `github-release-source-zip`
- Owner target: `axion-dev-enterprise`
- Notes: Axion Dev Enterprise release repository.

## Technology stack

Project-specific stack

## Quality gates

- CI workflow: `.github/workflows/ci.yml`
- Release workflow: `.github/workflows/release.yml`
- Production hygiene validation: `D:\Projetos\SCRIPTS\verify-production-builds.ps1`

## Local setup

```bash
# Follow the project-specific setup documented in this repository.
```

## Validation and build

```bash
# No standard run commands were detected automatically.
```

## Release process

1. Develop and validate in `D:\Projetos\SANDBOX`.
2. Sync the clean release copy into `D:\Projetos\PRODUCTION\apps\axion-vps`.
3. Run CI and local validation.
4. Create or update the GitHub repository for this project.
5. Publish tagged releases through GitHub Actions.

## Source of truth

The development source of truth for this project lives in:

`D:\Projetos\SANDBOX\apps\axion-vps`
