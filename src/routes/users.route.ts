import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z
            .string()
            .min(8)
            .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        }),
      },
    },
    async (request, reply) => {
      const { email, name, password } = request.body

      console.log(email, name, password)

      return reply.status(201)
    },
  )
}
