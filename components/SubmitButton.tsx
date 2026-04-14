'use client'
// Must be 'use client' because useFormStatus is a client-side hook

import { useFormStatus } from 'react-dom'

interface SubmitButtonProps {
  label: string        // Normal label: "Sign in", "Save", "Submit"
  pendingLabel: string // Label while loading: "Signing in...", "Saving..."
  className?: string
}

export default function SubmitButton({ label, pendingLabel, className = '' }: SubmitButtonProps) {
  // useFormStatus reads the state of the PARENT <form> automatically.
  // You don't need to pass anything to it.
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
        ${pending ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
        ${className}`}
    >
      {pending ? pendingLabel : label}
    </button>
  )
}