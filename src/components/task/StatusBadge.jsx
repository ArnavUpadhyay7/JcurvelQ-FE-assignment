import { Badge } from '../shared/Badge.jsx'

// Maps task status to visual representation
const STATUS_CONFIG = {
  running: {
    variant: 'blue',
    label: 'running',
    icon: (
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse-slow" />
    ),
  },
  complete: {
    variant: 'green',
    label: 'done',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  failed: {
    variant: 'red',
    label: 'failed',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  // cancelled with sufficient_data is intentionally neutral/positive
  cancelled: {
    variant: 'teal',
    label: 'skipped',
    icon: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
}

const StatusBadge = ({ status, cancelReason }) => {
  const config =
    status === 'cancelled' && cancelReason === 'sufficient_data'
      ? STATUS_CONFIG.cancelled
      : STATUS_CONFIG[status] ?? STATUS_CONFIG.running

  return (
    <Badge variant={config.variant}>
      {config.icon}
      {config.label}
    </Badge>
  )
}

export default StatusBadge;