import * as yargs from 'yargs'
export const argv = yargs.usage('Usage: $0 <command> [options]')
    .example('$0 --username=username --password=password', 'start test execution with basic auth credentials')
    .options({
        u: {
            alias:     'username',
            default:   "",
            describe:  'username for basic authentication',
            type:      'string',
            conflicts: 'include'
        },
        p: {
            alias:     'password',
            default:   "",
            describe:  'password for basic authentication',
            type:      'boolean',
            conflicts: 'include'
        }
    })
    .demandOption([])
    .help('h')
    .alias('h', 'help')
    .epilog('PostIdent VideoServer')
    .argv;