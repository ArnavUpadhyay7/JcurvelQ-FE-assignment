const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-surface-3 text-dim',
    blue: 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20',
    green: 'bg-accent-green/10 text-accent-green border border-accent-green/20',
    amber: 'bg-accent-amber/10 text-accent-amber border border-accent-amber/20',
    red: 'bg-accent-red/10 text-accent-red border border-accent-red/20',
    violet: 'bg-accent-violet/10 text-accent-violet border border-accent-violet/20',
    teal: 'bg-accent-teal/10 text-accent-teal border border-accent-teal/20',
    sky: 'bg-accent-sky/10 text-accent-sky border border-accent-sky/20',
  }

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge;