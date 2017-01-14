/*
 * @Author: octopus
 * @Date:   2017-01-10 15:10:23
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 10:13:16
 */

(function(Fly) {
    'use strict';
    var Sky = function(obj) {
        this.sky = obj.img;
        this.x0 = obj.x || 0;
        this.speed = 0.17;
        this.context = obj.context;

    }
    Sky.prototype.render = function(delta) {

        this.context.save();

        this.context.drawImage(this.sky, this.x0, 0);
        this.x0 -= this.speed * delta;
        if (this.x0 <= -this.sky.width) {
            this.x0 += this.sky.width * 2;
        }

        this.context.restore();
    }

    Fly.Sky = Sky;
})(window.Fly)
