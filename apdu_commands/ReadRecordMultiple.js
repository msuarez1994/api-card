import { EventEmitter } from 'events';
import hexify from 'hexify';

class ReadRecordMultiple{

    constructor(objeto){
        this.bytes = objeto.bytes;
        let cmd = 0xB3;
        let sfi = objeto.sfi;
        let recordNumber = objeto.recordNumber;
        let offset = objeto.offset;
        let length = objeto.length;

        this.bytes = [];
        this.bytes.push(cmd);
        this.bytes.push(sfi);
        this.bytes.push(recordNumber);
        this.bytes.push(offset);
        this.bytes.push(length);
    }
    
    toString(){
        return hexify.toHexString(this.bytes);
    }

    toBuffer() {
        return new Buffer(this.bytes);
    }

}

export default ReadRecordMultiple;