var method = user_list.prototype;

// [Constructor]
function user_list() {
    this._list = [];
}

// [Add a user into list]
method.add = function(user){
    this._list.push(user);
} 

// [Find a user using this id]
method.findById = function(id) {
    
    //var list = Object(this);
    var length = this._list.length >>> 0;
    var value;

    for (var i = 0; i < length; i++) {
      value = this._list[i];

      if(value.getId() == id)
        return value;
    }
    return null;
};


method.removeById = function(id){
    var length = this._list.length >>> 0;
    var value;

    for (var i = 0; i < length; i++) {
        value = this._list[i];

        if(value.getId() == id){
            this._list.splice(i, 1);
            return true;
        }        
    }
    return false;
}

// [Clear all information of users]
method.clear = function(){
    this._list.length = 0;
}

module.exports = user_list;