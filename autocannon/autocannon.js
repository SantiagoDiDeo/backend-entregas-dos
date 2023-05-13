import autocannon from 'autocannon';
import {PassThrough} from 'stream';
import logger from '../logger/logger.js';

const benchmark = () => {

    const run = (url) => {
        const buf = [];
        const outputStream = new PassThrough();
    
        const inst = autocannon({
            url,
            connections: 100,
            duration: 20
        });
    
        autocannon.track(inst, {outputStream});
    
        outputStream.on('data', data => buf.push(data));
        inst.on('done', () => {
            process.stdout.write(Buffer.concat(buf));
        })
    
    };

    logger.info('running benchmarks..');

    run('http://localhost:8080/info');

};

export default benchmark;


