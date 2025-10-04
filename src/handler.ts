import { execFileSync } from 'node:child_process'
import { chdir } from 'node:process'
import type { Context } from 'hono'

export const startCiProcess = async (c: Context) => {
  const homeDir = process.env.HOME || process.env.USERPROFILE
  if (homeDir) {
    chdir(homeDir)
    console.log('Changed directory to:', process.cwd())
  } else {
    console.error('Home directory not found')
  }

  try {
    const stdout = execFileSync('./ci.sh', {
      stdio: 'pipe',
      encoding: 'utf8',
    })
    c.status(200)
    return c.json({ status: stdout })
  } catch (e) {
    if (e instanceof Error) {
      const err = e as NodeJS.ErrnoException
      c.status(500)
      return c.json({ error: err.code })
    } else {
      c.status(500)
      return c.json({ error: e })
    }
  }
}
