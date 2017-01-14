/*
 * @Author: octopus
 * @Date:   2017-01-10 15:42:56
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 10:11:41
 */

(function(Fly) {
    'use strict';
    var Land = function(obj) {
        this.land = obj.img;
        this.x0 = obj.x || 0;
        this.context = obj.context;
        this.speed = 0.17;

    }
    Land.prototype.render = function(delta) {

        this.context.save();

        this.context.drawImage(this.land, this.x0, this.context.canvas.height - this.land.height);
        this.x0 -= this.speed * delta;
        if (this.x0 <= -this.land.width) {
            this.x0 += this.land.width * 4;
        }

        this.context.restore();
    }

    Fly.Land = Land;
})(window.Fly)
