import { router, publicProcedure } from "../trpc"
import { z } from "zod"

export const wordRouter = router({
  isValidWord: publicProcedure.input(z.string()).mutation(({ input }) => {
    return prisma?.word.findFirst({ where: { word: input } })
  }),
})
