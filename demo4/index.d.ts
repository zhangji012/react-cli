import * as React from 'react';

export interface CascaderProps {
    data: any[],
    value: string[],
    limit?: number,
    onSave: (arr: string[]) => void,
    onCancel: () => void,
    onSelect?: (code: string) => void,
    isExtraType?: boolean,
    isIcon?: boolean,
    isSave?: boolean,
    type?: number, // 1 黄色 2 蓝色
    allow?: string[], // 允许选择的项目 array[]
    title?: string // 头部标题
}

export interface CascaderState {

export default class Alert extends React.Component<CascaderProps, CascaderState> {
    render(): JSX.Element;
}