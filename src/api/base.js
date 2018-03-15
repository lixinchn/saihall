import fetch from '../utils/fetch/fetch'


function do_fetch(real_fetch, api_name, data, method) {
  const url = api_name + '.php'
  return (data !== undefined) ? real_fetch({url, method, data}) : real_fetch({url, method})
}

export function fetch_wrapper(api_name, data = undefined, method = 'post') {
  return do_fetch(fetch, api_name, data, method)
}
