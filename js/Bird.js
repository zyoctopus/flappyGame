/*
 * @Author: octopus
 * @Date:   2017-01-10 14:11:07
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 21:05:14
 */

(function(Fly) {
    'use strict';

    function Bird(obj) {
        this.bx0 = 100;
        this.by0 = 100;
        this.birds = obj.img;
        this.context = obj.context;
        this.imgList = obj.imgList;
        this.bwidth = this.birds.width / 3;
        this.bheight = this.birds.height;
        this.bIndex = 0;
        this.v0 = 0; //初始速度
        this.g = 0.0006; //加速度
        this.maxAngle = 45;
        this.maxSpeed = 0.5;

        // 定义订阅者数组
        this.listener = [];

    }

    Bird.prototype.render = function(delta) {
        var y = 0,
            currentAngle = 0,
            g = this.g,
            maxSpeed = this.maxSpeed,
            maxAngle = this.maxAngle;

        y = this.v0 * delta + 0.5 * g * delta * delta;
        this.v0 += g * delta; //更新初始速度

        // 设置旋转的角度
        currentAngle = this.v0 / maxSpeed * maxAngle;
        if (this.v0 > maxSpeed) {
            currentAngle = maxAngle;
        } else if (this.v0 < -maxSpeed) {
            currentAngle = -maxAngle;
        }

        // 绘制小鸟
        this.context.save();

        this.context.translate(this.bx0, this.by0 += y);
        this.context.rotate(Fly.toRadian(currentAngle));
        // console.log(y);
        this.context.drawImage(this.birds, this.bwidth * this.bIndex++, 0, this.bwidth, this.bheight, -this.bwidth / 2, -this.bheight / 2, this.bwidth, this.bheight);
        this.bIndex %= 3;

        this.context.restore();
    }

    Bird.prototype.changeSpeed = function(s) {
        this.v0 = s;
    }

    // 判断小鸟是否碰撞
    Bird.prototype.isDie = function() {
        var ctx = this.context;

        if (ctx.isPointInPath(this.bx0 + 12, this.by0) || ctx.isPointInPath(this.bx0 - 12, this.by0) || ctx.isPointInPath(this.bx0, this.by0 + 12) || ctx.isPointInPath(this.bx0, this.by0 - 12) || this.by0 < 0 || this.by0 > this.imgList.sky.height - this.imgList.land.height - 10) {

            // 碰撞的话推送消息
            this.trigger();
            return true;
        }
        return false;
    }

    // 定义订阅方法
    Bird.prototype.addListener = function(fn) {
        this.listener.push(fn);
    }

    // 定义推送方法
    Bird.prototype.trigger = function() {
        // console.log(this.listener);
        this.listener.forEach(function(fn) {
            fn();
        });
    }

    Fly.Bird = Bird;

})(window.Fly)
