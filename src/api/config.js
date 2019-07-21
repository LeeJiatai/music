//请求默认数据
export const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}
  
export const options = {
  param: 'jsonpCallback'
}


//0 => success
export const ERR_OK = 0