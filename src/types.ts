export type actionType = {
    type: string,
    payload: any,
}

export type stateType = {
    projectData: {
        data: {
            project: string,
            period: string,
        }
    },
    chartData: {
        chart: TableDataType[],
    },
}

export type LevelDeepType  = 0 | 1 | 2 | 3 | 4 | 5;

export type TableType  = {
    period_start: string;
    period_end: string;
    title: string;
    childCounter: number;
    level: LevelDeepType;
    key: number;
    children?: TableType[];
} & {[key: string]: any}

export type TableDataType = {
    id: number;
    title: string;
    period_start: string;
    period_end: string;
    sub?: TableDataType[] ;
}