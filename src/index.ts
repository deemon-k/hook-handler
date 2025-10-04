import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { startCiProcess } from './handler.js'

const app = new Hono()

app.post('/hooks/deploy', c => startCiProcess(c))

serve({
  fetch: app.fetch,
  port: 8789,
})
