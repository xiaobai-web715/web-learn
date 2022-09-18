//写一个构造函数
let PublishSubscribe = null;
(function (){
    let obj = {};
    PublishSubscribe = function(){
        this.subscribe = function(target, callback){
            obj[target] = callback;
        };
        this.publish = function(target, ...args){
            obj[target](args);
        };
    };
})();
export default PublishSubscribe;