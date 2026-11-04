# homey.myStrom

huser's fork of the Homey app for myStrom devices (`ch.mystrom.smarthome`), upstream `cgHome/homey.myStrom`.

## Canon (mandatory reading)

- Common rules: `~/Projects/llm-hq/claude/CLAUDE.md`

No stack guideline exists for Homey apps yet. Read the canon before working. Reference it, never copy its content here.

## Project specifics

- Stack: Homey Apps SDK v3 (Node.js, CommonJS), Homey Compose (`.homeycompose/`, `app.json` is generated), `bonjour-service` for discovery, `my-homey` helper lib from `cgHome/homey.my-homey`.
- Run/dev: `npm run debug` (needs the Homey CLI and a Homey on the network), `npm run lint`, `npm run build`.
- Package manager: npm, not bun. Upstream ships `package-lock.json` and the Homey CLI uses npm.
- Environment: personal project, no server deploy target. Releases go through `homey app publish` to the Homey App Store.
- Remotes: `origin` is the fork, `upstream` is `cgHome/homey.myStrom`. Sync with `git fetch upstream && git merge --ff-only upstream/main`. Work meant for upstream goes on a feature branch for a PR, not on `main`.
- Test network (from lothal): Homey Pro 2019 "Rouis" `192.168.0.18`, myStrom devices on VLAN 1. UniFi read-only credentials in the gitignored `.env` (`UNIFI_HOST`, `UNIFI_USER`, `UNIFI_PASSWORD`), the real site id is `fhemt46t`, not `default`.
- Changelog: `.homeychangelog.json` (Homey format), version in `.homeycompose/app.json`.
