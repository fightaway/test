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
        //箭的预制体
        arrowPrefab: {
            default: null,
            type: cc.Prefab
        },

        //箭靶
        object: {
            default: null,
            type : cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //碰撞检测开始
        cc.director.getCollisionManager().enabled = true;
        //cc.director.getCollisionManager().enabledDebugDraw = true;

        //生成一支箭
        console.debug('Game 中生成新的箭');
        this.spawnNewArrow();
    },
    
    spawnNewArrow: function() {
        //生成新的箭
        var newArrow = cc.instantiate(this.arrowPrefab);

        //把箭添加到 Canvas 节点下面
        this.node.addChild(newArrow);

        //初始化箭的位置
        newArrow.setPosition(0, -200);

        //把Game传给Arrow
        newArrow.getComponent('Arrow').game = this;
    },
    
    start () {

    },

    gameOver: function() {
        this.object.stopAllActions();
    }

    // update (dt) {},
});
