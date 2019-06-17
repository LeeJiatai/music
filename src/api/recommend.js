import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config.js'
import axios from 'axios';

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    
    return jsonp(url, data, options);
}

export function getDiscList() {
    const url = 'api/getDiscList';
    const data = Object.assign({}, commonParams, {
        picmid: 1,
        rnd: Math.random(),
        loginUin: 0,
        hostUin: 0,
        inCharset: 'utf8',
        platform: 'yqq.json',
        categoryId: 10000000,
        sortId: 5,
        sin: 0, 
        ein: 19,
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then( (res) => {
        return Promise.resolve(res.data)
    })
}

//获取推荐歌曲列表
export function getSongList(disstid) {
    const url = '/api/getCdInfo'

    const data = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        g_tk: 711432892,
        platform: 'yqq.json',
        hostUin: 0,
        format: 'json',
        needNewCode: 0
    })

    return axios.get(url, {
        params: data
    }).then( (res) => {
        return Promise.resolve(res.data)
    })
}