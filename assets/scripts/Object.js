// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        //旋转持续时间
        rotateDuration: 0,

        //旋转的速度
        rotateAngle: 0,

        //旋转的方向
        rotateFowrd: 0,

    },

    setRotateAction: function() {
        var rotateClockWise = cc.rotateBy(this.rotateDuration, this.rotateAngle);

        var rotateCounterClockWise = cc.rotateBy(this.rotateDuration, -this.rotateAngle);

        return cc.repeatForever(cc.sequence(rotateClockWise, rotateCounterClockWise));
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        var ACTION_TAG = 8;
        this.rotateAction = this.setRotateAction();

        this.rotateAction.setTag(ACTION_TAG);
        this.node.runAction(this.rotateAction);
    },

    start () {

    },

    // update (dt) {},
});
