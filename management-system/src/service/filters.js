import moment from 'moment'
var filters = {
  dateFormat: function (value) {
    return moment(value).format('YYYY-MM-DD H:mm:ss')
  }
}
export default filters
