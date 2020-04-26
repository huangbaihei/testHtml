const str = '{{qwe}}qwere{{oi}}'
const value = str.replace(/\{\{(.+?)\}\}/g, (...args) => {
  console.log(args)
  return args[1]
})
console.log(value)