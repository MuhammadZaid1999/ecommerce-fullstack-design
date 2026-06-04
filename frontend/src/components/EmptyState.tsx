import type { ReactNode } from 'react'

export function EmptyState({
  children,
  text,
  title,
}: {
  children?: ReactNode
  text: string
  title: string
}) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{text}</p>
      {children}
    </div>
  )
}
