import { redirect } from 'next/navigation'

export default function RootPage() {
  // Simple redirection to dashboard if authenticated (middleware handles the rest)
  redirect('/dashboard')
}
