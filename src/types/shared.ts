export type Bounds = {
  top: number
  bottom: number
  left: number
  right: number
  width: number
  height: number
}

export type Action = {
  type: string
  payload?: any
}

export interface Data<DataType> {
  get: () => DataType
  set: (type: string, payload?: any) => void
}
