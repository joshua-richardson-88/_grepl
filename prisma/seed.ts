import { prisma } from "../src/server/db/client"
import words from "./wordList.json"

async function main() {
  const data = words.data.map((e: string) => ({ word: e }))
  await prisma.word.createMany({ data })
}

main()
  .then(async () => await prisma.$disconnect)
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect
    process.exit(1)
  })
