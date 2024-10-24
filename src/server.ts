import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { usersRoutes } from './routes/users.route'

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('users').select('*')

  return tables
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(usersRoutes, { prefix: 'users' })

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running! 🚀')
  })
