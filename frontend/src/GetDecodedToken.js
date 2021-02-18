import { useJwt } from 'react-jwt'
import useToken from './hooks/useToken'

function GetDecodedToken() {
  const { token } = useToken()
  const { decodedToken } = useJwt(token)
  return decodedToken
}

export default GetDecodedToken
