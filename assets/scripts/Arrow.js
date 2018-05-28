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

        fireDuration: 3,

        arrowGap: 150,

        isMoveing: false,

        // 暂存Game对象
        game: {
            default: null,
            serializable: false
        }
    },

    setMoveAction: function() {
        var moveUp = cc.moveTo(this.fireDuration, 0, 1204);
        return moveUp;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        
        // 添加鼠标事件，当鼠标点击箭时，箭发射
        this.node.on(cc.Node.EventType.MOUSE_UP, function(event){
            // 箭开始移动
            this.moveAction = this.setMoveAction();
            this.node.runAction(this.moveAction);
            this.isMoveing = true;
        }, this);
        
       /*
        // 添加触屏时间，当触摸箭的时，发射箭
        this.node.on(cc.Node.EventType.TOUCH_START, function(event){
            // 箭开始移动
            this.moveAction = this.setMoveAction();
            this.node.runAction(this.moveAction);
        }, this);
        */
    },

    start () {

    },

    // 判断箭是否飞了足够的距离来产生新的箭
    getArrowDistance: function() {
        // 取得箭当前的位置和初始位置的距离
        var dist = Math.abs(this.node.getPosition().y + 200);
        return dist;
    },

    update: function (dt) {
        // 当箭移动超过一只箭的位置时，新生成一只箭
        if(this.getArrowDistance() > this.arrowGap){
            if(this.isMoveing){
                //console.debug('调用 Game 中的方法生成新的 arrow');
                this.game.spawnNewArrow();
                this.isMoveing = false;
            }
        };
        
        if(this.getArrowDistance() > 500){
            this.node.destroy();
        }
    },

    followTarget: function(){
        // 先把箭从 Canvas 节点移除
        //cc.removeSelf();
        console.log('run here');
        //this.game.node.removeChild(this);
        //this.node.parent = this.game.object;
        //this.game.object.node.addChild(this);
        var followAction = cc.follow(this.game.object);
        this.node.runAction(followAction);
    },
    
    // 判断碰撞，如果碰撞 target，则停止箭的运动，并把箭附着到靶子上， 碰撞到 arrow 则游戏结束
    onCollisionEnter: function (other, self) {
        //碰撞到 target 靶子
        if(other.tag === 22){
            //箭停止向上飞行
            this.node.stopAction(this.moveAction);
            //箭成为靶子的子节点
            this.node.parent = other.node;
            this.node.rotation = -other.node.rotation;
            //取得旋转给定弧度后的新向量
            var pos = cc.Vec2.UP.rotate((180-this.node.rotation)*(Math.PI/180));

            //根据半径缩放箭的向量
            pos.mulSelf(50+55);
            //设置箭的位置
            this.node.setPosition(pos);
        }

        // 碰撞到arrow
        if(other.tag === 0){
            console.log('碰撞到arrow');
            console.debug('碰撞到self_arrow x ' + self.node.x);
            console.debug('碰撞到self_arrow y ' + self.node.getPosition().y);
            console.debug('碰撞到other_arrow x ' + other.node.x);
            console.debug('碰撞到other_arrow y ' + other.node.getPosition().y);
            this.node.stopAllActions();
            this.game.gameOver();
        }
        //other.node.addChild(this.node);
    }
    
});
