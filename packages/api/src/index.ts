import cors from 'cors'
import express from 'express'
import { readFileSync, readdirSync } from 'fs'
import { Workspace } from 'types'

const app = express()
const port = 5000

app.use(cors({ origin: 'http://localhost:3000' }))

app.get('/workspaces', (_, response) => {
  const workspaces: Workspace[] = readdirSync('..').map(dir => {
    const json = readFileSync(`../${dir}/package.json`, 'utf8')
    const { name, version } = JSON.parse(json)
    return { name, version }
  })

  response.json({ data: workspaces })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
