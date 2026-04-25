export interface IrisData {
  leftIris:  { x: number; y: number; z: number } | null
  rightIris: { x: number; y: number; z: number } | null
  landmarks: { x: number; y: number; z: number }[] | null
  facialTransformMatrix: number[] | null
}

export interface GazeAngles {
  pitch: number
  yaw:   number
  roll:  number
}
