interface darukOptions {
    routerPath: string;
    servicePath: string;
    utilPath: string;
    configPath: string;
    monitorPath: string;
    middlewarePath: string;
    [propName: string]: any;
}

interface serviceDes {
    name: string;
    export: any;
    config: any;
}

interface middlewareDes {
    name: string;
    export: any;
    config: any;
}

interface monitorDes {
    name: string;
    export: any;
    config: any;
}

interface utilDes {
    name: string;
    export: any;
}