import Robot from './Robot.js';

export default class FlyingRobot extends Robot {

    constructor(name, legs) {
        super(name, legs);

        this.canFly = true;
    };

    takeOff() {
        console.log(`Have a good flight ${this.name}`);
    };

    land() {
        console.log(`Welcome back ${this.name}`);
    };

    sayHi() {
        console.log(`Hello! My name is ${this.name} and I am a flying robot`);
    };
};