/*
 * @Description:
 * @version:
 * @Author: camus
 * @Date: 2021-02-26 13:41:17
 * @LastEditors: camus
 * @LastEditTime: 2021-02-26 13:50:17
 */
import React from 'react'
import loadable from '@/components/loadable/loadable'
import { Skeleton } from 'antd'
export const PhotoGeneral=loadable(()=>import('./General'),{
  fallback: <Skeleton active={true} paragraph={{ rows: 15 }}></Skeleton>
})

export const NotesGeneral=loadable(()=>import('./NotesGeneral'),{
  fallback: <Skeleton active={true} paragraph={{ rows: 15 }}></Skeleton>
})
