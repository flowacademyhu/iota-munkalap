import useToken from './useToken'
import jwt from 'jwt-simple'

function useCurrentUser() {
  const { token } = useToken()
  var decodedToken = jwt.decode(token, false, 'RS256')

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
