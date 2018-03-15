import fetch from '../utils/fetch/fetch'


function do_fetch(api_name, data, method) {
  const url = api_name
  return (data !== undefined) ? fetch({url, method, data}) : fetch({url, method})
}

export function fetch_wrapper(api_name, data = undefined, method = 'post') {
  console.log(api_name)
  return do_fetch(api_name, data, method)
}
