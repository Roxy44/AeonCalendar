import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { LevelDeepType, stateType, TableDataType, TableType } from '../types';

import moment from 'moment';

import './TableComponent.css';

const colorOptimazer = {
    0: '',
    1: 'blue',
    2: 'yellow',
    3: 'green',
    4: 'green',
    5: 'yellow',
}

const TableComponent: React.FC = () => {
    const dispatch = useDispatch();

    const projectData = useSelector((state: stateType) => state.projectData.data);
    const chartData = useSelector((state: stateType) => state.chartData.chart);
    
    const [ startProjectTime, endProjectTime ] = projectData.period.split('-');

    const parseStart = moment(startProjectTime, 'DD.MM.YYYY');
    const parseEnd = moment(endProjectTime, 'DD.MM.YYYY');

    let projectDays = [];
    let dayCounter = parseStart.clone().subtract(1, 'days'); 
    if (projectDays.length === 0) {
        while (dayCounter.isSameOrBefore(parseEnd)) { 
            projectDays.push(dayCounter.format('YYYY-MM-DD'));
            dayCounter = dayCounter.add(1, 'd');
        }
    }

    const columns: ColumnsType<TableType> = [
        {
            title: 'Work item',
            dataIndex: 'title',
            fixed: true,
            width: 390,
            render: (title, row) => (
                row.childCounter.toString() + ' ' + title
            ),
        },
    ];

    let columnTitle;
    for (let counterIndex = 0; counterIndex < projectDays.length; counterIndex += 7) {
        if (!!projectDays[counterIndex + 6]) {
            columnTitle = moment(projectDays[counterIndex]).format('DD MMM') + ' - ' + moment(projectDays[counterIndex + 6]).format('DD MMM');
        } else {
            columnTitle = moment(projectDays[counterIndex]).format('DD MMM') + ' - ' + moment(projectDays[projectDays.length - 1]).format('DD MMM');
        }
        columns.push(
            {
                title: columnTitle,
                width: 148,
                children: 
                    projectDays.slice(counterIndex, counterIndex + 7).map(item => (
                        {
                            title: () => {
                                if (moment(item).format('DD')[0] === '0') {
                                    return moment(item).format('DD')[1]
                                }
                                else {
                                    return moment(item).format('DD')
                                }
                            },
                            dataIndex: item,
                            width: 22,
                            render: (str, row) => {
                                if (item === row.period_start) {
                                    return (
                                        <div className={`timeline ${colorOptimazer[row.level]}`}></div>
                                    )
                                }
                                if (item === moment(row.period_end).add(1, 'd').format('YYYY-MM-DD')) {
                                    return (
                                        <span className='barTitle'>{row.title}</span>
                                    )
                                }
                                return <div className='tdCell'>{str}</div>
                            },
                            onCell: (row) => {
                                if (item === row.period_start) {
                                    return {
                                        colSpan: moment(row.period_end).diff(moment(row.period_start), 'days') + 1,
                                    }
                                } else if (moment(item).isBetween(moment(row.period_start), moment(row.period_end).add(1, 'd'))) {
                                    return {
                                        colSpan: 0,
                                    }
                                } 
                                return {
                                    colSpan: 1,
                                }
                            }
                        } 
                    )
                ),
            },
        );
    }

    useEffect(() => {
        dispatch({type: 'GET_PROJECT_DATA'});
        dispatch({type: 'GET_CHART_DATA'});
	}, []);

    // todo any type!!
    const tranformData = (data: TableDataType[], counter: LevelDeepType = 0): TableType[] => {
        counter++;
        let childCounter = 0;
        if (!Array.isArray(data) || data.length === 0) return [];
        return data.map((item) => {
            let children;
            if (!!item.sub) {
                childCounter = Object.keys(item.sub).length;
                children = tranformData(item.sub, counter);           
            }
            return (
                {   
                    [item.period_start]: '',
                    [item.period_end]: '',
                    title: item.title,
                    period_start: item.period_start,
                    period_end: item.period_end,
                    key: item.id,
                    level: counter,
                    childCounter,
                    children,
                }
            )
        })
    }

    return (
        <div className='table-container'>
            <Table columns={columns} dataSource={tranformData(chartData)} scroll={{ x: 1400}} pagination={false} />
        </div>
    )
}

export default TableComponent;