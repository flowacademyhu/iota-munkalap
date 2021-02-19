import { useJwt } from 'react-jwt'
import useToken from './useToken'

function useCurrentUser() {
  const { token } = useToken()
  const { decodedToken } = useJwt(token)
  const name = decodedToken?.family_name + ' ' + decodedToken?.given_name
  const email = decodedToken?.email
  const isAdmin = decodedToken?.resource_access.worksheetclient.roles.includes(
    'admin'
  )
  return {
    name,
    email,
    isAdmin,
  }
}

export default useCurrentUser
