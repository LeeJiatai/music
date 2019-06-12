import { commonParams, ERR_OK } from './config'
import { getUid } from 'common/js/uid'
import axios from 'axios'

//获取歌词
export function getLyric(mid) {
  const url = '/api/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq.json',
    hostUin: 0,
    needNewCode: 0,
    format: 'json',
    notice: 0,
    pcachetime: +new Date(),
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }) 
}


//获取歌曲路径
export function getSongsUrl(songs) {
  const url = '/api/getPurUrl'

  let mids = [];
  let types = [];

  songs.forEach((song) => {
    mids.push(song.mid);
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return new Promise((resolve, reject) => {
    let tryTime = 3;

    function request() {
      return axios.post(url, {
        comm: data,
        req_0: urlMid
      }).then((response) =>{
        const res = response.data;
        if(res.code === ERR_OK) {
          let urlMid = res.req_0
          if(urlMid && urlMid.code === ERR_OK) {
            const purlMap = {}
            urlMid.data.midurlinfo.forEach((item) => {
              if(item.purl) {
                purlMap[item.songmid] = item.purl
              }
            })
            if(Object.keys(purlMap).length > 0) {
              resolve(purlMap)
            } else {
              retry()
            }
          } else {
            retry()
          }
        } else {
          retry()
        }
      })
    }

    function retry() {
      if(--tryTime > 0) {
        request()
      } else {
        reject(new Error('can not get the song url!'))
      }
    }

    request()
  })
}

function genUrlMid(mids, types) {
  const guid = getUid();
  return {
    module: 'vkey.GetVkeyServer',
    method: 'CgiGetVkey',
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}