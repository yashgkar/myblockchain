const sha256 = require('sha256');

function Blockchain(){
    this.chain=[];
    this.pendingMessages=[];

    this.createNewBlock(100,"0","0");
}

Blockchain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    const newBlock={
        index: this.chain.length + 1,
        timestamp: Date.now(),
        messages: this.pendingMessages,
        nonce: nonce,
        previousBlockHash: previousBlockHash,
        hash: hash
    };
    this.pendingMessages= [];
    this.chain.push(newBlock);
    return newBlock;
}

Blockchain.prototype.getLastBlock= function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewMessage = function(nonce,sender,reciever){
    const newMessage = {
        nonce:nonce,
        sender:sender,
        reciever:reciever,
    };
    this.pendingMessages.push(newMessage);
    return this.getLastBlock(['index']+1);
}

Blockchain.prototype.hashBlock= function(previousBlockHash, currentBlockData, nonce){
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
}

Blockchain.prototype.proofOfWork= function(){
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);
    while(hash.substring(0,4)!== '0000'){
        nonce++;
        hash = this.hashBlock(previousBlockHash,currentBlockData,nonce);        
    }
    return nonce;
}



module.exports= Blockchain;