import storage from 'good-storage'

//搜索历史
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

//播放历史
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
    const index = arr.findIndex(compare)

    if(index === 0) {
        return
    } 
    if(index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val);
    if(maxLen && arr.length > maxLen) {
        arr.pop()
    }
}

export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    insertArray(searches, query, (item) => {
        return item === query
    }, SEARCH_MAX_LEN)
    storage.set(SEARCH_KEY, searches)
    return searches
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    console.log(3737, index)
    if(index > -1) {
        arr.splice(index, 1)
    }
}

export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, []);
    deleteFromArray(searches, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    console.log(49, searches)
    return searches
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

//缓存播放列表
export function savePlay(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs)
    return songs
}

//获取播放缓存
export function loadPLay() {
    return storage.get(PLAY_KEY, [])
}