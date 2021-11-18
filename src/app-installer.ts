import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as io from '@actions/io'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

const toolName = 'aws-cli'

export async function install(version: string): Promise<void> {
  let toolPath: string
  toolPath = tc.find(toolName, version)
  if (!toolPath) {
    toolPath = await downloadAWSCli(version)
  }
  core.addPath(toolPath)
}

function getDownloadUrl(version: string): string {
  return `https://awscli.amazonaws.com/awscli-exe-linux-x86_64-${version}.zip`
}

async function downloadFile(downloadUrl: string): Promise<string> {
  const filePath = await tc.downloadTool(downloadUrl)
  const destPath = `${filePath}.zip`

  await io.mv(filePath, destPath)

  return destPath
}

async function downloadAWSCli(version: string): Promise<string> {
  try {
    const downloadUrl = getDownloadUrl(version)
    let installFilePath = await downloadFile(downloadUrl)

    if (path.extname(downloadUrl) === '.zip') {
      const extractedPath = await tc.extractZip(installFilePath)
      installFilePath = path.join(extractedPath, 'aws', 'install')

      const rootPath = path.parse(installFilePath).dir
      const installDestinationDir = path.join(rootPath, '.local', 'lib', 'aws')
      const binDestinationDir = path.join(rootPath, '.local', 'bin')
      const installArgs: string[] = [
        '--install-dir',
        installDestinationDir,
        '--bin-dir',
        binDestinationDir
      ]
      await exec.exec(installFilePath, installArgs)
      return binDestinationDir
    } else {
      const errormsg = 'Unsupported extension'
      throw new Error(errormsg)
    }
  } catch (err) {
    throw err
  }
}
