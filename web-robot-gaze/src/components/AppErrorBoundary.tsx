import { Component, type ErrorInfo, type ReactNode } from 'react'
import FallbackUI from './FallbackUI'

interface Props {
  children: ReactNode
}

interface State {
  error: Error | null
}

export default class AppErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('AppErrorBoundary caught render failure', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <FallbackUI
          reason="render-error"
          message={this.state.error.message.slice(0, 120)}
        />
      )
    }

    return this.props.children
  }
}
