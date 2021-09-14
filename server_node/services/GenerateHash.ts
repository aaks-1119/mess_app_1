import cryptoRandomString from "crypto-random-string";

const GenerateHash = (length : number) : string=>{
    return cryptoRandomString({length: length, type: 'url-safe'});
}


export default GenerateHash;