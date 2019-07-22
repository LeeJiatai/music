import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'
import { type } from 'os';


function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}


export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list);
  if(state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList);
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list);
  }
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export const randomPlay = function({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export const insertSong = function({commit, state}, song ) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  console.log(42, playlist, sequenceList, currentIndex);
  //记录当前歌曲
  let currentSong = playlist[currentIndex]
  //查找当前列表中是否有带插入歌曲并返回索引
  let fpIndex = findIndex(playlist, song);
  //因为时插入歌曲所以索引+1
  currentIndex++
  //插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  //如果已经包含了这首歌曲
  if(fpIndex > -1) {
    //如果插入序号大于列表中的序号
    if( currentIndex > fpIndex ) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      //数组长度
      playlist(fpIndex + 1, 1)
    }
  }

  //获取列表中播放index
  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if(fsIndex > -1) {
    if(currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true);
  commit(types.SET_PLAYING_STATE, true);
}

export const saveSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, clearSearch(query))
}

//删除列表歌曲
export const deleteSong = function({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);

  console.log(99, pIndex, currentIndex)

  if(currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playList.length > 0
  commit(types.SET_PLAYING_STATE, playingState);
}

export const delateSongList = function({commit, state}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false);
}

export const savePlayHistory = function({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const saveFavoriteList = function({commit}, song) {
  commit(types,SET_FAVORITE_LIST, saveFavorite(song))
}

export const delateFavoriteList = function({commit}, song) {
  commit(types,SET_FAVORITE_LIST, deleteFavorite(song))
}