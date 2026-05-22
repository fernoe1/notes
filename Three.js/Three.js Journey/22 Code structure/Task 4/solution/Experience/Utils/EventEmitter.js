export default class EventEmitter {

    on(type, listener) {
        if (this._listeners === undefined) this._listeners = {};

        const listeners = this._listeners;

        if (listeners[type] === undefined) 
            listeners[type] = listener;
        else if (typeof listeners[type] === 'function') 
            listeners[type] = [listeners[type], listener];
        else 
            listeners[type].push(listener);

        return this;
    }

    off(type, listener) {
        if (this._listeners === undefined) return;

        if (this._listeners[type] === undefined) return;

        const listeners = this._listeners;

        if (typeof listeners[type] === 'function') {
            if (listeners[type] === listener) delete this._listeners[type];
        } else {
            const listenerArr = listeners[type];
            const index = listenerArr.indexOf(listener);
            if (index !== -1) listenerArr.splice(index, 1);
        }

        return this;
    }

    offAll(type) {
        if (!this._listeners) return;
        delete this._listeners[type];
    }

    trigger(event) {
        if (this._listeners === undefined) return;
        
        if (this._listeners[event.type] === undefined) return;

        event.target = this;

        const listeners = this._listeners;

        if (typeof listeners[event.type] === 'function') {
            listeners[event.type].call(this, event);
        } else {
            const listenerArr = listeners[event.type].slice(0);
            for (let i = 0; i < listenerArr.length; i++) listenerArr[i].call(this, event);
        }

        return this;
    }

}