/*
 * @Author: octopus
 * @Date:   2017-01-10 20:13:53
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 10:12:07
 */
(function(Fly) {
    'use strict';

    function Pipe(obj) {
        this.context = obj.context;
        this.pipeTop = obj.pipeTop;
        this.pipeBottom = obj.pipeBottom;
        this.x0 = obj.x;
        this.yTop = 0;
        this.yBottom = 0;
        this.pipeH = this.pipeTop.height;
        this.pipeW = this.pipeTop.width;

        // 管道之间的间隔
        this.pipeSpance = 150;

        // 管道的最小、大长度
        this.minLen = 50;
        this.maxLen = 250;

        this.speed = 0.17;
        this.initSetting();
    }

    Pipe.prototype.initSetting = function() {
        var topLen = Math.random() * 200 + 50;
        this.yTop = -this.pipeH + topLen;
        this.yBottom = topLen + this.pipeSpance;
    }

    Pipe.prototype.render = function(delta) {
        var ctx = this.context;
        ctx.save();
        ctx.drawImage(this.pipeTop, this.x0, this.yTop);
        ctx.drawImage(this.pipeBottom, this.x0, this.yBottom);
        this.x0 -= this.speed * delta;

        if (this.x0 < -this.pipeW) {
            this.x0 += this.pipeW * 6 * 3;
            this.initSetting();
        }

        ctx.rect(this.x0, this.yTop, this.pipeW, this.pipeH);
        ctx.rect(this.x0, this.yBottom, this.pipeW, this.pipeH);
        ctx.restore();

    }

    Fly.Pipe = Pipe;

})(window.Fly)
