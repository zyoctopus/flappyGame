/*
 * @Author: octopus
 * @Date:   2017-01-10 21:47:17
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 21:32:13
 */
(function(Fly) {
    'use strict';
    var Game = function(obj) {

        // this.context = obj.context;
        // this.imgNameList = obj.imgNameList;

        this.lastTime = new Date() * 1;
        this.objList = [];
        this.play = true;
        this.bird = null;
    }

    Game.prototype = {
        constructor: Game,

        init: function(ctx, imgList) {
            var objList = this.objList,
                that = this,
                factory = Fly.factory;

            // 创建天空对象
            for (var i = 0; i < 2; i++) {
                objList.push(factory("Sky", {
                    img: imgList.sky,
                    x: imgList.sky.width * i,
                    context: ctx
                }));
            };

            // 创建管道
            for (var i = 0; i < 6; i++) {
                objList.push(factory("Pipe", {
                    context: ctx,
                    pipeTop: imgList.pipe2,
                    pipeBottom: imgList.pipe1,
                    x: 300 + imgList.pipe2.width * i * 3
                }))
            };

            // 创建陆地
            for (var i = 0; i < 4; i++) {
                objList.push(factory("Land", {
                    img: imgList.land,
                    x: imgList.land.width * i,
                    context: ctx

                }));
            };

            objList.push(factory("Timing", {
                context: ctx
            }));

            this.bird = factory("Bird", {
                img: imgList.birds,
                context: ctx,
                imgList: imgList
            });

            objList.push(this.bird);

            // 订阅小鸟的碰撞推送
            this.bird.addListener(function() {
                that.gameOver();
            });

            ctx.canvas.addEventListener("mousedown", function() {
                that.bird.changeSpeed(-.3);
            });

        },
        gameStart: function() {
            this.lastTime = new Date() * 1;
            this.objList = [];
            this.play = true;
            this.render();
        },
        gameOver: function() {
            this.play = false;
            var btn = document.getElementById("btn");
            btn.style.display = "block";

        },
        render: function() {

            // 进行初始化
            var that = this,
                ctx = this.context,
                objList = this.objList;

            Fly.loadImg(this.imgNameList, function(imgList) {
                that.init(ctx, imgList);
                // 进行渲染
                var render = function() {


                    // 清除画布
                    ctx.clearRect(0, 0, cv.width, cv.height);
                    ctx.save();
                    ctx.beginPath();
                    var currentTime = new Date() * 1,
                        delta = currentTime - that.lastTime;

                    that.lastTime = currentTime; //更新最新时间

                    // 进行游戏渲染（发行者发布）
                    for (var i = 0; i < objList.length; i++) {
                        objList[i].render(delta);
                    };

                    ctx.restore();

                    // 判断小鸟碰撞
                    that.bird.isDie();

                    if (that.play) {
                        window.requestAnimationFrame(render);
                    }
                };
                window.requestAnimationFrame(render);
            });
        }
    }

    var gameObj = new Game();

    Fly.Game = function(obj) {
        for (var k in obj) {
            gameObj[k] = obj[k];
        }
        return gameObj;
    };

})(window.Fly)
