var Trie = require("./trie.js"),
    fs = require("fs");

Autocompleter = function(){
  //this.data = new Trie();
};

Autocompleter.prototype.complete = function(prefix){
  //return this.data.autoComplete(prefix);

};

Autocompleter.prototype.add = function(word){
  //this.data.learn(word);
  console.log("Learning word:", word);
};

Autocompleter.prototype.readFile = function(fileName){
  var that = this;
  fs.readFile(fileName, "utf8", function(err, data){
    if(err){
      console.log(err)
    }
    var titles = data.toString().split(/\n/g);
    titles.forEach(function(title){
      if(title !== title.match(/\s*/)[0]){
        this.add(title)
      }
    },that)
  });
};

try {
  module.exports = Autocompleter;
} catch(e){

}