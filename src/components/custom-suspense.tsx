import {
  type ComponentProps,
  type ReactNode,
  type ReactDOM,
  forwardRef,
  createElement,
  Children,
} from 'react'

interface Props extends ComponentProps<'div'> {
  isPending: boolean
  fallback: ReactNode
  nullback?: ReactNode
  container?: keyof ReactDOM | 'fragment'
}

export const CustomSuspense = forwardRef<HTMLDivElement, Props>(
  (
    { isPending, fallback, nullback, children, container = 'div', ...props },
    ref
  ) => {
    if (isPending) return createElement(container, { ...props, ref }, fallback)
    if (nullback && Children.toArray(children).length <= 0) return nullback
    if (container === 'fragment') return <>{children}</>

    return createElement(container, { ...props, ref }, children)
  }
)

export default CustomSuspense
