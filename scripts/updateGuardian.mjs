#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { arch, platform, release } from 'node:os';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, '..');
const guardianFilePath = resolve(repoRoot, 'tools', 'ProjectGuardian.kt');
const rootPackageJsonPath = resolve(repoRoot, 'package.json');
const webPackageJsonPath = resolve(repoRoot, 'apps', 'web', 'package.json');
const lockfilePath = resolve(repoRoot, 'package-lock.json');

const parseJsonFile = (filePath) => {
	return JSON.parse(readFileSync(filePath, 'utf8'));
};

const parseJsonFileSafe = (filePath) => {
	try {
		return JSON.parse(readFileSync(filePath, 'utf8'));
	} catch {
		return null;
	}
};

const runCommand = (command) => {
	try {
		return execSync(command, {
			cwd: repoRoot,
			stdio: ['ignore', 'pipe', 'ignore']
		}).toString().trim();
	} catch {
		return 'unknown';
	}
};

const toIsoSeconds = (date) => {
	return date.toISOString().replace(/\.\d{3}Z$/u, 'Z');
};

const escapeKotlinString = (value) => {
	return `${value ?? ''}`
		.replace(/\\/gu, '\\\\')
		.replace(/"/gu, '\\"')
		.replace(/\$/gu, '\\$');
};

const readFileHash = (filePath) => {
	try {
		return createHash('sha256').update(readFileSync(filePath)).digest('hex');
	} catch {
		return 'unknown';
	}
};

const readNpmVersion = () => {
	const userAgent = process.env.npm_config_user_agent ?? '';
	const npmMatch = userAgent.match(/npm\/([^\s]+)/u);
	if (npmMatch?.[1]) {
		return npmMatch[1];
	}

	const resolvedVersion = runCommand('npm --version');
	return resolvedVersion || 'unknown';
};

const rootPackageJson = parseJsonFile(rootPackageJsonPath);
const webPackageJson = parseJsonFile(webPackageJsonPath);
const lockfileJson = parseJsonFileSafe(lockfilePath);
const now = new Date();
const generatedAtUtc = toIsoSeconds(now);
const generatedEpochMs = `${now.getTime()}`;
const gitDirtyOutput = runCommand('git status --porcelain');
const workspaceCount = Array.isArray(rootPackageJson.workspaces) ? `${rootPackageJson.workspaces.length}` : 'unknown';
const lockfileVersion = `${lockfileJson?.lockfileVersion ?? 'unknown'}`;
const lockfilePackageCount = lockfileJson?.packages ? `${Object.keys(lockfileJson.packages).length}` : 'unknown';
const gitDirtyFileCount = gitDirtyOutput === 'unknown' ? 'unknown' : `${gitDirtyOutput.split('\n').filter((line) => line.length > 0).length}`;
const turboVersion = rootPackageJson.devDependencies?.turbo ?? 'unknown';

const guardianPurpose = 'Machine-updated project information manifest used for build diagnostics, archival traceability, and maintenance workflows.';
const guardianDeletionPolicy = 'CRITICAL PROJECT INFRASTRUCTURE: NEVER DELETE, RENAME, OR HAND-EDIT THIS FILE. Removal breaks updateGuardian metadata tracking and project traceability.';

const metadataEntries = [
	['owner', 'PorkyProductions'],
	['repo', 'deMotivator'],
	['defaultBranch', 'Stable'],
	['guardianSchemaVersion', '2'],
	['guardianVersion', rootPackageJson.version ?? 'unknown'],
	['rootPackageName', rootPackageJson.name ?? 'unknown'],
	['workspaceGlobsCount', workspaceCount],
	['webWorkspaceName', webPackageJson.name ?? 'unknown'],
	['webWorkspaceVersion', webPackageJson.version ?? 'unknown'],
	['generatedAtUtc', generatedAtUtc],
	['generatedEpochMs', generatedEpochMs],
	['lastBuildAtUtc', generatedAtUtc],
	['buildLifecycleEvent', process.env.npm_lifecycle_event ?? 'unknown'],
	['buildLifecycleScript', process.env.npm_lifecycle_script ?? 'unknown'],
	['buildWorkspaceName', process.env.npm_package_name ?? 'unknown'],
	['runningInCi', process.env.CI ? 'true' : 'false'],
	['nodeEnv', process.env.NODE_ENV ?? 'unknown'],
	['nodeVersion', process.version],
	['npmVersion', readNpmVersion()],
	['turboVersion', turboVersion],
	['osPlatform', platform()],
	['osRelease', release()],
	['osArch', arch()],
	['gitBranch', runCommand('git rev-parse --abbrev-ref HEAD')],
	['gitCommitFull', runCommand('git rev-parse HEAD')],
	['gitCommitShort', runCommand('git rev-parse --short HEAD')],
	['gitCommitCount', runCommand('git rev-list --count HEAD')],
	['gitLastCommitAtUtc', runCommand('git log -1 --format=%cI')],
	['gitWorktreeDirty', gitDirtyOutput === 'unknown' ? 'unknown' : (gitDirtyOutput.length > 0 ? 'true' : 'false')],
	['gitDirtyFileCount', gitDirtyFileCount],
	['lockfileVersion', lockfileVersion],
	['lockfilePackageCount', lockfilePackageCount],
	['packageLockSha256', readFileHash(lockfilePath)],
	['generatedBy', 'scripts/updateGuardian.mjs'],
	['generatedFrom', 'apps/web prebuild:updateGuardian'],
	['purpose', guardianPurpose],
	['deletionPolicy', guardianDeletionPolicy]
];

const metadataMapLines = metadataEntries.map(([key, value]) => {
	return `\t\t\t"${escapeKotlinString(key)}" to "${escapeKotlinString(value)}"`;
}).join(',\n');

const contentLines = [
	'/*',
	' * ProjectGuardian.kt',
	' * AUTO-GENERATED PROJECT INFORMATION MANIFEST.',
	' *',
	' * THIS FILE IS CRITICAL PROJECT INFRASTRUCTURE.',
	' * DO NOT DELETE, RENAME, OR HAND-EDIT IT.',
	' * Deleting this file breaks guardian metadata updates and traceability.',
	' */',
	'',
	'package io.porkyproductions.guard',
	'',
	'import java.time.Instant',
	'',
	'/**',
	' * ProjectGuardian is the canonical machine-updated project information file.',
	' *',
	' * It records build, repository, runtime, and environment metadata used by',
	' * maintenance tooling and human diagnostics. This file is intentionally kept',
	' * in-source for auditability and must never be removed from the repository.',
	' */',
	'object ProjectGuardian {',
	`\t@JvmStatic val createdAt: Instant = Instant.parse("${escapeKotlinString(generatedAtUtc)}")`,
	'',
	`\t@JvmStatic val lastBuildAt: Instant = Instant.parse("${escapeKotlinString(generatedAtUtc)}")`,
	'',
	'\t@JvmStatic const val GUARDIAN_SCHEMA_VERSION: String = "2"',
	'',
	`\t@JvmStatic const val GUARDIAN_VERSION: String = "${escapeKotlinString(rootPackageJson.version ?? 'unknown')}"`,
	'',
	`\t@JvmStatic const val GUARDIAN_PURPOSE: String = "${escapeKotlinString(guardianPurpose)}"`,
	'',
	`\t@JvmStatic const val GUARDIAN_DELETION_POLICY: String = "${escapeKotlinString(guardianDeletionPolicy)}"`,
	'',
	'\t@JvmStatic',
	'\tfun heartbeat(): String {',
	'\t\treturn "ProjectGuardian[version=$GUARDIAN_VERSION, schema=$GUARDIAN_SCHEMA_VERSION, buildAt=$lastBuildAt] heartbeat at ${Instant.now()}"',
	'\t}',
	'',
	'\t@JvmStatic',
	'\tfun metadata(): Map<String, String> {',
	'\t\treturn mapOf(',
	metadataMapLines,
	'\t\t)',
	'\t}',
	'',
	'\t@JvmStatic',
	'\tfun noop(): Unit {}',
	'}',
	''
];

writeFileSync(guardianFilePath, contentLines.join('\n'), 'utf8');

console.log(`ProjectGuardian.kt regenerated at ${generatedAtUtc}`);
console.log(`Guardian version: ${rootPackageJson.version ?? 'unknown'}`);
console.log(`Git commit: ${metadataEntries.find(([key]) => key === 'gitCommitShort')?.[1] ?? 'unknown'}`);
