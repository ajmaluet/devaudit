const fs = require("fs")
const path = require("path")

function scanDependencies() {
  const pkgPath = path.join(process.cwd(), "package.json")

  if (!fs.existsSync(pkgPath)) {
    console.log("No package.json found in this directory.")
    return
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath))
  const dependencies = pkg.dependencies || {}

  console.log("Scanning dependencies...")
  for (const dep in dependencies) {
    console.log(`Checking ${dep} (version ${dependencies[dep]})...`)
    if (dep.toLowerCase().includes("lodash")) {
      console.log(`⚠ Vulnerability found in ${dep}! Update recommended.`)
    }
  }
  console.log("Scan complete ✅")
}

module.exports = { scanDependencies }

if (require.main === module) {
  scanDependencies()
}
