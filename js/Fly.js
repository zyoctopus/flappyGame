/*
 * @Author: octopus
 * @Date:   2017-01-10 14:10:31
 * @Last Modified by:   octopus
 * @Last Modified time: 2017-01-12 10:09:12
 */

(function(w) {
    'use strict';
    var Fly = {};
    Fly.loadImg = function(arr, callback) {

        var imgList = {},
            imgCount = 0,
            imgNum = arr.length;

        arr.forEach(function(val) {
            var img = new Image();
            img.src = "./imgs/" + val + ".png";
            imgList[val] = img;

            img.addEventListener("load", function() {
                imgCount++;

                // 判断是否所有图片加载完成
                if (imgCount >= imgNum) {
                    callback(imgList);
                }
            })
        });
    };

    Fly.toRadian = function(angle) {
        return Math.PI * angle / 180;
    }

    // 对象工厂
    Fly.factory = function(name, obj) {
        switch (name) {
            case "Sky":
                return new Fly.Sky(obj);
                break;
            case "Pipe":
                return new Fly.Pipe(obj);
                break;
            case "Land":
                return new Fly.Land(obj);
                break;
            case "Bird":
                return new Fly.Bird(obj);
                break;
            case "Timing":
                return new Fly.Timing(obj);
                break;
            default:
                return null;
        }
    }

    w.Fly = Fly;

})(window)
