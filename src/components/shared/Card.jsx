const Card = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-surface-2 border border-border rounded-lg ${className}`}
    >
      {children}
    </div>
  )
}

export default Card;