import moment from 'moment'
import 'moment/locale/hu'

export default function getCurrentDate() {
  return moment().format('YYYY MMMM Do')
}
