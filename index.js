const core = require('@actions/core')
const md5 = require('md5.js')

try {
  const project = core.getInput('project')
  const google_project = core.getInput('google_project')
  const environment = core.getInput('environment')
  const sa_type = core.getInput('sa_type')

  const domain_part = `${google_project}.iam.gserviceaccount.com`
  let local_part = `${sa_type}-${project}-${environment}`

  if (local_part.length > 29) {
    const hash = new md5().update(local_part).digest('hex').substring(0, 3)
    local_part = `${local_part.substring(0, 26)}-${hash}`
  }

  core.setOutput("serviceaccount", `${local_part}@${domain_part}`)
} catch (error) {
  core.setFailed(error.message)
}
