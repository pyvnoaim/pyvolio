export type PeripheralType = 'mouse' | 'mousepad' | 'keyboard' | 'headset'

export interface Peripheral {
  id: number
  type: PeripheralType
  brand: string
  name: string
  variant: string | null
  color: string | null
  info: string | null
  skates?: string | null
  surface?: string | null
  using: boolean
  link: string | null
  acquired: string | null
  image: string | null
  rating: number | null
}
