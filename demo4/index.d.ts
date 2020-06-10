import * as React from 'react';

export interface CascaderProps {
    data: any[],
    hotCityData: any[],
    value: string[],
    limit?: number,
    onSave: (arrCodes: string[], arrObj: any[]) => void,
    onCancel: (str?: string) => void,
    onSelect?: (codeStr: string, codeObj: object) => void,
    isExtraType?: boolean,
    isSave?: boolean,
    type?: number, // 1 黄色 2 蓝色
    allow?: string[], // 允许选择的项目 array[]
    title?: string, // 头部标题
    hasHotNational?: boolean,  // 热门里是有有全国
    language?: number,  // 1 中文 2 英文
    hasQuanguo?: boolean,  // 默认有全国
}

export interface CascaderState {

export default class Alert extends React.Component<CascaderProps, CascaderState> {
    render(): JSX.Element;
}