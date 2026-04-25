export const lerp = (a: number, b: number, t: number): number =>
  a + (b - a) * t

export class MovingAverageFilter {
  private buf: number[]
  private idx = 0

  constructor(private size = 5) {
    this.buf = Array(size).fill(0)
  }

  push(v: number): number {
    this.buf[this.idx] = v
    this.idx = (this.idx + 1) % this.size
    return this.buf.reduce((a, b) => a + b, 0) / this.size
  }

  reset() {
    this.buf.fill(0)
    this.idx = 0
  }
}
