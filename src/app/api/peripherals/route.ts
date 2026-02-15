import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { Peripheral } from '@/types'

const filePath = path.join(process.cwd(), 'public', 'peripherals.json')

async function readPeripherals(): Promise<Peripheral[]> {
  const data = await fs.readFile(filePath, 'utf8')
  return JSON.parse(data)
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const using = searchParams.get('using')

  const peripherals = await readPeripherals()

  const result = using === 'true' ? peripherals.filter((item) => item.using) : peripherals

  return NextResponse.json(result)
}
