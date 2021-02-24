export const env = {
    project: {
        prefix: 'api/v0',
        port: 3000
    },
    openApi: {
        title: 'Web Server API',
        description: 'The Web API description',
        version: '1.0',
        tag: 'nestJsApi',
    },
    mongodb: {
        databaseName: 'nest',
        url: process.env.DB_URL ?? 'mongodb://localhost'
    }
};
