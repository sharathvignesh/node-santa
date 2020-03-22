var queue = (function() {
    'use strict';

    let messageQueue = []

    function _emptyQueue() {
        messageQueue = []
    }

    function addMessage(content) {
        messageQueue.push(content)
    }

    function getQueue() {
        const messageQueueCopy = [...messageQueue];
        _emptyQueue()
        return messageQueueCopy
    }

    return {
        addMessage: addMessage,
        getQueue: getQueue,
    };
  })();
  
  module.exports = queue;
