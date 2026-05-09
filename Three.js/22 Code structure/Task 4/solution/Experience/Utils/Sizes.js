import EventEmitter from "./EventEmitter.js";

export default class Sizes extends EventEmitter {

    constructor() {
        super();
        this.width = innerWidth;
        this.height = innerHeight;
        this.pixelRatio = Math.min(devicePixelRatio, 2);

        this.nativeResizeListener = () => {
            this.width = innerWidth;
            this.height = innerHeight;
            this.pixelRatio = Math.min(devicePixelRatio, 2);

            this.trigger({ type: 'resize' });
        }

        addEventListener('resize', this.nativeResizeListener);
    }

    destroy() { removeEventListener('resize', this.nativeResizeListener); }
}