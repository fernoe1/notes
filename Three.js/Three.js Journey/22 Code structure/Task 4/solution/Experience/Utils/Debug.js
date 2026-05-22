import GUI from "lil-gui";

export default class Debug {

    constructor() {
        this.active = location.hash === '#debug';

        if (this.active) {
            this.gui = new GUI({
                title: 'debug',
                width: 370,
                closeFolders: true
            });

            addEventListener('keypress', (e) => {
                if (e.key === 'h') this.gui.show(this.gui._hidden);
            });
        }
    }

}