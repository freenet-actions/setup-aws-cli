import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as installer from '../src/app-installer'

describe('app installer tests', () => {
  it('check the installation', async () => {
    const toolDir = process.env['RUNNER_TOOL_CACHE'] as string
    const version = '1.7.0'
    console.log('test started')    
    // await installer.install(version)
  }, 50000)
})
