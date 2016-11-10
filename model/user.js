var method = user.prototype;

// [Constructor]
function user() {
    this._money = 0;
}

///////// getter & setter /////////
method.getId = function() {
    return this._id;
};

method.setId = function(id) {
    this._id = id;
};

method.getMoney = function() {
    return this._money;
};

method.setMoney = function(money) {
    this._money = money;
};

///////////////////////////////////

// [Add money user`s deposit]
method.addMoney = function(money) {
    this._money = this._money + money;
}

module.exports = user;