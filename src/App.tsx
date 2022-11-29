import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import TableComponent from './components/TableComponent';

import { Button } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';

import './App.css';
import { stateType } from './types';

const App: React.FC = () => {
    const dispatch = useDispatch();
    
    const projectData = useSelector((state: stateType) => state.projectData.data);
    
    useEffect(() => {
        dispatch({type: 'GET_PROJECT_DATA'});
	}, []);

    return (
        <div className='App'>
            <div className='header'>
                <span className='title'>{projectData.project + ' / ' + projectData.period}</span>
                <Button className='exportButton' icon={<VerticalAlignBottomOutlined />}>Export</Button>
            </div>
            <TableComponent />
        </div>
    );
}

export default App;
