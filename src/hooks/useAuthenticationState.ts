import { useSelector } from 'react-redux'
import { getAuthenticatedStatus } from '../store/getter'

export default function useAuthenticationState() {
  const state = useSelector(getAuthenticatedStatus)

  return [state]
}
