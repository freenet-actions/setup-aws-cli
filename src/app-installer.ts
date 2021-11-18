import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as io from '@actions/io'
import * as os from 'os'
import * as path from 'path'
import * as tc from '@actions/tool-cache'

const toolName = 'aws-cli'

export async function install(version: string): Promise<void> {
  let toolPath: string
  toolPath = await isAlreadyInstalled()
  if (!toolPath) {
    toolPath = await downloadAWSCli(version)
  }
  console.log('tool path', toolPath)
  core.addPath(toolPath)
}

async function isAlreadyInstalled(): Promise<string> {
  return tc.find(toolName, '*')
}

function getDownloadUrl(): string {
  return 'https://s3.amazonaws.com/aws-cli/awscli-bundle.zip'
}

async function downloadFile(downloadUrl: string): Promise<string> {
  const filePath = await tc.downloadTool(downloadUrl)
  const destPath = `${filePath}.zip`

  await io.mv(filePath, destPath)

  return destPath
}

async function readFile(filepath: string): Promise<string> {
  try {
    return fs.readFileSync(filepath, 'utf-8')
  } catch (err) {
    throw err
  }
}

async function downloadAWSCli(version: string): Promise<string> {
  try {
    const downloadUrl = getDownloadUrl()
    let installFilePath = await downloadFile(downloadUrl)

    if (path.extname(downloadUrl) === '.zip') {
      const extractedPath = await tc.extractZip(installFilePath)
      installFilePath = path.join(extractedPath, 'awscli-bundle', 'install')

      const rootPath = path.parse(installFilePath).dir
      const installDestinationDir = path.join(rootPath, '.local', 'lib', 'aws')
      const installArgs: string[] = ['-i', installDestinationDir]
      const binFile = 'aws'
      await exec.exec(installFilePath, installArgs)
      return path.join(installDestinationDir, 'bin', binFile)
    } else {
      const errormsg = 'Unsupported extension'
      throw new Error(errormsg)
    }
  } catch (err) {
    throw err
  }
}
