#!/usr/bin/env node
// Configure this site for a deploy target (vercel or hostinger).
// Re-runnable: switching targets later just runs this again with the other arg.

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const VALID_TARGETS = ['vercel', 'hostinger']
const target = process.argv[2]

if (!VALID_TARGETS.includes(target)) {
  console.error(`Usage: node scripts/configure-deploy-target.mjs <${VALID_TARGETS.join('|')}>`)
  console.error(`Got: ${target ?? '(none)'}`)
  process.exit(1)
}

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const targetsDir = join(root, '.deploy-targets')

if (!existsSync(targetsDir)) {
  console.error(`Missing ${targetsDir} — this site was already configured. Re-run from a fresh template if you need to switch.`)
  console.error(`(Manual switch: edit next.config.ts, package.json build script, and the DEPLOY-*.md by hand.)`)
  process.exit(1)
}

const targetDir = join(targetsDir, target)
if (!existsSync(targetDir)) {
  console.error(`No deploy-target preset for "${target}" at ${targetDir}`)
  process.exit(1)
}

console.log(`Configuring for ${target}…`)

// 1. next.config.ts — copy target-specific version if one exists
const targetConfig = join(targetDir, 'next.config.ts')
if (existsSync(targetConfig)) {
  cpSync(targetConfig, join(root, 'next.config.ts'), { force: true })
  console.log('  • next.config.ts → target version')
}

// 2. scripts/ — copy any target-specific build/start scripts
const targetScripts = join(targetDir, 'scripts')
if (existsSync(targetScripts)) {
  mkdirSync(join(root, 'scripts'), { recursive: true })
  cpSync(targetScripts, join(root, 'scripts'), { recursive: true, force: true })
  console.log('  • scripts/ → target-specific scripts copied')
}

// 3. DEPLOY-<TARGET>.md → project root
const deployDoc = join(targetDir, `DEPLOY-${target.toUpperCase()}.md`)
if (existsSync(deployDoc)) {
  cpSync(deployDoc, join(root, `DEPLOY-${target.toUpperCase()}.md`), { force: true })
  console.log(`  • DEPLOY-${target.toUpperCase()}.md → project root`)
}

// 4. package.json — patch build script
const pkgPath = join(root, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
const newBuild = target === 'hostinger'
  ? 'next build && node scripts/prepare-standalone.mjs'
  : 'next build'
if (pkg.scripts.build !== newBuild) {
  pkg.scripts.build = newBuild
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`  • package.json build script → "${newBuild}"`)
}

// 5. Remove the OTHER target's deploy doc if present (from a prior config)
for (const other of VALID_TARGETS) {
  if (other === target) continue
  const stale = join(root, `DEPLOY-${other.toUpperCase()}.md`)
  if (existsSync(stale)) {
    rmSync(stale)
    console.log(`  • removed stale DEPLOY-${other.toUpperCase()}.md`)
  }
}

// 6. Remove the .deploy-targets/ directory — site is now committed to its target
//    (re-scaffold from template-base if you need to switch)
rmSync(targetsDir, { recursive: true, force: true })
console.log('  • removed .deploy-targets/ (commit the result)')

console.log(`Done. This site is now configured for ${target}.`)
console.log(target === 'vercel'
  ? '  Next: invoke the deploy-vercel skill, or see DEPLOY-VERCEL.md'
  : '  Next: see DEPLOY-HOSTINGER.md for hPanel setup')
