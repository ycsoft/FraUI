import { Injectable } from '@angular/core';

@Injectable()
export class SmallTypeColorService {

    private array = [];
    constructor() {
        this.array = [{
            name: '风险',
            color: '#ff2600'
        }, {
            name: '公益环保',
            color: '#ff6d00'
        }, {
            name: '家庭',
            color: '#ff8b8b'
        }, {
            name: '价值观',
            color: '#facbc2'
        }, {
            name: '健康与疾病',
            color: '#e62565'
        }, {
            name: '旅游',
            color: '#9b2fae'
        }, {
            name: '满意度',
            color: '#673fb4'
        }, {
            name: '能力',
            color: '#9c9cdd'
        }, {
            name: '情绪',
            color: '#0036fc'
        }, {
            name: '人际关系',
            color: '#4054b2'
        }, {
            name: '色彩偏好',
            color: '#005397'
        }, {
            name: '社会态度',
            color: '#2b98f0'
        }, {
            name: '身材容貌',
            color: '#1eaaf1'
        }, {
            name: '手机使用',
            color: '#1fbcd2'
        }, {
            name: '睡眠',
            color: '#00fdff'
        }, {
            name: '思维处事',
            color: '#b4ebf1'
        }, {
            name: '网络社交',
            color: '#055a5b'
        }, {
            name: '文学影视偏好',
            color: '#167c80'
        }, {
            name: '消费',
            color: '#198e6d'
        }, {
            name: '性行为',
            color: '#4da348'
        }, {
            name: '休闲娱乐',
            color: '#8bc052'
        }, {
            name: '学业能力',
            color: '#cdda49'
        }, {
            name: '艺术',
            color: '#f0f3c5'
        }, {
            name: '音乐',
            color: '#b6cac0'
        }, {
            name: '饮食',
            color: '#fee94e'
        }, {
            name: '语言表达',
            color: '#ffaa00'
        }, {
            name: '孕产期',
            color: '#fd9727'
        }, {
            name: '运动',
            color: '#eeb200'
        }, {
            name: '职业',
            color: '#efce69'
        }, {
            name: '自我认知',
            color: '#ccbe5e'
        }, {
            name: '宗教',
            color: '#feebb6'
        }, {
            name: '选中',
            color: '#f3c9dd'
        }];
    }

    public getColor(small: string) {
        return this.array.find((element) => element.name === small) || {};
    }

}
