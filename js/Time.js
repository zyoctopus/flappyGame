/*
 * @Author: octopus
 * @Date:   2017-01-11 15:05:29
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 10:13:26
 */

(function(Fly) {
    'use strict';

    function Timing(obj) {
        this.startTime = new Date() * 1;
        this.context = obj.context;
    }
    Timing.prototype.render = function() {
        var currentTime = new Date() * 1,
            duration = ~~((currentTime - this.startTime) / 1000),
            timeString = ~~(duration / 3600) + " : " + ~~(duration % 3600 / 60) + " : " + duration % 60 + " . " + (currentTime - this.startTime) % 1000;

        this.context.save();
        this.context.fillStyle = "red";
        this.context.font = '25px "微软雅黑"';
        this.context.fillText(timeString, 600, 50);
        this.context.restore();
    }

    Fly.Timing = Timing;
})(window.Fly)
