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
	@JvmStatic val createdAt: Instant = Instant.parse("2026-05-12T02:12:29Z")

	@JvmStatic val lastBuildAt: Instant = Instant.parse("2026-05-12T02:12:29Z")

	@JvmStatic const val GUARDIAN_SCHEMA_VERSION: String = "2"

	@JvmStatic const val GUARDIAN_VERSION: String = "14.1.1"

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
			"guardianVersion" to "14.1.1",
			"rootPackageName" to "demotivator-monorepo",
			"workspaceGlobsCount" to "2",
			"webWorkspaceName" to "demotivator-web",
			"webWorkspaceVersion" to "14.1.1",
			"generatedAtUtc" to "2026-05-12T02:12:29Z",
			"generatedEpochMs" to "1778551949910",
			"lastBuildAtUtc" to "2026-05-12T02:12:29Z",
			"buildLifecycleEvent" to "updateGuardian",
			"buildLifecycleScript" to "node -e \"const{spawnSync}=require('child_process'),p=require('os').platform();const r=p==='win32'?spawnSync('pwsh',['-File','../../scripts/updateGuardian.ps1'],{stdio:'inherit',shell:true}):spawnSync('zsh',['../../scripts/updateGuardian.sh'],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);\"",
			"buildWorkspaceName" to "demotivator-web",
			"runningInCi" to "false",
			"nodeEnv" to "unknown",
			"nodeVersion" to "v26.0.0",
			"npmVersion" to "11.12.1",
			"turboVersion" to "^2.9.10",
			"osPlatform" to "darwin",
			"osRelease" to "25.4.0",
			"osArch" to "arm64",
			"gitBranch" to "Stable",
			"gitCommitFull" to "250758d601d181f4f0d635f8c144c55f3ad9d7da",
			"gitCommitShort" to "250758d6",
			"gitCommitCount" to "1233",
			"gitLastCommitAtUtc" to "2026-05-11T10:39:14-04:00",
			"gitWorktreeDirty" to "true",
			"gitDirtyFileCount" to "6",
			"lockfileVersion" to "3",
			"lockfilePackageCount" to "1503",
			"packageLockSha256" to "8fe08c1b33d9b6e1215f5e78eed26e25ce4a28e1d2cc7ff55d31327147635900",
			"generatedBy" to "scripts/updateGuardian.mjs",
			"generatedFrom" to "apps/web prebuild:updateGuardian",
			"purpose" to "Machine-updated project information manifest used for build diagnostics, archival traceability, and maintenance workflows.",
			"deletionPolicy" to "CRITICAL PROJECT INFRASTRUCTURE: NEVER DELETE, RENAME, OR HAND-EDIT THIS FILE. Removal breaks updateGuardian metadata tracking and project traceability."
		)
	}

	@JvmStatic
	fun noop(): Unit {}
}
