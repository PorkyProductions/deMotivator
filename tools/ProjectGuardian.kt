/*
 * ProjectGuardian.kt
 * AUTO-GENERATED PROJECT INFORMATION MANIFEST.
 *
 * THIS FILE IS CRITICAL PROJECT INFRASTRUCTURE.
 * DO NOT DELETE, RENAME, OR HAND-EDIT IT.
 * Deleting this file breaks guardian metadata updates and traceability.
 */

package io.porkyproductions.guard

import java.time.Instant

/**
 * ProjectGuardian is the canonical machine-updated project information file.
 *
 * It records build, repository, runtime, and environment metadata used by
 * maintenance tooling and human diagnostics. This file is intentionally kept
 * in-source for auditability and must never be removed from the repository.
 */
object ProjectGuardian {
	@JvmStatic val createdAt: Instant = Instant.parse("2026-04-27T15:55:51Z")

	@JvmStatic val lastBuildAt: Instant = Instant.parse("2026-04-27T15:55:51Z")

	@JvmStatic const val GUARDIAN_SCHEMA_VERSION: String = "2"

	@JvmStatic const val GUARDIAN_VERSION: String = "14.0.0"

	@JvmStatic const val GUARDIAN_PURPOSE: String = "Machine-updated project information manifest used for build diagnostics, archival traceability, and maintenance workflows."

	@JvmStatic const val GUARDIAN_DELETION_POLICY: String = "CRITICAL PROJECT INFRASTRUCTURE: NEVER DELETE, RENAME, OR HAND-EDIT THIS FILE. Removal breaks updateGuardian metadata tracking and project traceability."

	@JvmStatic
	fun heartbeat(): String {
		return "ProjectGuardian[version=$GUARDIAN_VERSION, schema=$GUARDIAN_SCHEMA_VERSION, buildAt=$lastBuildAt] heartbeat at ${Instant.now()}"
	}

	@JvmStatic
	fun metadata(): Map<String, String> {
		return mapOf(
			"owner" to "PorkyProductions",
			"repo" to "deMotivator",
			"defaultBranch" to "Stable",
			"guardianSchemaVersion" to "2",
			"guardianVersion" to "14.0.0",
			"rootPackageName" to "demotivator-monorepo",
			"workspaceGlobsCount" to "2",
			"webWorkspaceName" to "demotivator-web",
			"webWorkspaceVersion" to "14.0.0",
			"generatedAtUtc" to "2026-04-27T15:55:51Z",
			"generatedEpochMs" to "1777305351708",
			"lastBuildAtUtc" to "2026-04-27T15:55:51Z",
			"buildLifecycleEvent" to "updateGuardian",
			"buildLifecycleScript" to "node -e \"const{spawnSync}=require('child_process'),p=require('os').platform();const r=p==='win32'?spawnSync('pwsh',['-File','../../scripts/updateGuardian.ps1'],{stdio:'inherit',shell:true}):spawnSync('zsh',['../../scripts/updateGuardian.sh'],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);\"",
			"buildWorkspaceName" to "demotivator-web",
			"runningInCi" to "false",
			"nodeEnv" to "unknown",
			"nodeVersion" to "v25.8.1",
			"npmVersion" to "11.11.1",
			"turboVersion" to "^2.9.6",
			"osPlatform" to "darwin",
			"osRelease" to "25.4.0",
			"osArch" to "arm64",
			"gitBranch" to "dev",
			"gitCommitFull" to "59c6626bef8b7ecb141f3a0ed7a36f372026df82",
			"gitCommitShort" to "59c6626b",
			"gitCommitCount" to "1162",
			"gitLastCommitAtUtc" to "2026-04-27T11:55:04-04:00",
			"gitWorktreeDirty" to "true",
			"gitDirtyFileCount" to "1",
			"lockfileVersion" to "3",
			"lockfilePackageCount" to "1528",
			"packageLockSha256" to "e0f6dd1726bc9b61a2dc8deb2fcb5036fa50436adf05d3bc6a2be54c18133f2e",
			"generatedBy" to "scripts/updateGuardian.mjs",
			"generatedFrom" to "apps/web prebuild:updateGuardian",
			"purpose" to "Machine-updated project information manifest used for build diagnostics, archival traceability, and maintenance workflows.",
			"deletionPolicy" to "CRITICAL PROJECT INFRASTRUCTURE: NEVER DELETE, RENAME, OR HAND-EDIT THIS FILE. Removal breaks updateGuardian metadata tracking and project traceability."
		)
	}

	@JvmStatic
	fun noop(): Unit {}
}
