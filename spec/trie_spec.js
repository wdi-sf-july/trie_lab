var Trie = require("../trie.js");

describe("Trie", function() {
  it("can be initialized", function() {
    var t = new Trie();
  });

  describe("with a trie", function(){
    var t;
    beforeEach(function() {
      t = new Trie();
    });

    describe(".learn", function(){
      it("learns a word character by character", function(){
        t.learn("be");
        var b = t.characters.b;
        expect(b).toBeDefined();
        expect(b.isWord).toBeFalsy();
        var e = b.characters.e;
        expect(e).toBeDefined();
        expect(e.isWord).toBeTruthy();
        expect(e.characters).toEqual({});
      });
      it("learns an extension", function(){
        t.learn("be");
        t.learn("begin");
        var e = t.characters.b.characters.e;
        expect(e.isWord).toBeTruthy();
        var n = e.characters.g.characters.i.characters.n;
        expect(n.isWord).toBeTruthy();

      });
      it("learns a prefix", function(){
        t.learn("begin");
        t.learn("be");
        var e = t.characters.b.characters.e;
        expect(e.isWord).toBeTruthy();
        var n = e.characters.g.characters.i.characters.n;
        expect(n.isWord).toBeTruthy();
      });
    });

    describe(".find", function(){
      it("returns falsy for a nonexistent string", function(){
        expect(t.find("nope")).toBeFalsy();
      });
      it("returns the right node for a string", function(){
        t.learn("b");
        expect(t.find("b")).toEqual(t.characters.b);
      });
      it("returns the right node for a prefix", function(){
        t.learn("begin");
        expect(t.find("b")).toEqual(t.characters.b);
      });
      it("returns the last node for a prefix", function(){
        // Thanks to Nikki Anderson and Stephanie Daffara
        t.learn("begin");
        t.learn("began");
        var ending = t.characters.b.characters.e.characters.g;
        expect(t.find("beg")).toEqual(ending);
      });
    });

    describe(".getWords", function(){
      it("gets a child word", function(){
        t.learn("beast");
        expect(t.getWords()).toEqual(["beast"]);
      });
      it("gets multiple child words", function(){
        t.learn("begin");
        t.learn("beginner");
        expect(t.getWords()
          ).toEqual(["begin", "beginner"]);
      });
      it("gets its own node if it is a word", function(){
        t.learn("a");
        expect(t.characters.a.getWords()).toEqual([""]);
      });
      it("returns an empty array if there are no words", function(){
        expect(t.getWords()).toEqual([]);
      });
      it("returns multiple children on different branches", function(){
        // Thanks to Stu Stein.
        t.learn("begin");
        t.learn("best");
        expect(t.getWords()
          ).toEqual(["begin", "best"]);
      });
    });
    describe(".autoComplete", function(){
      beforeEach(function(){
        t.learn("be");
        t.learn("begin");
        t.learn("beginner");
        t.learn("beast");
      });

      it("can recover multiple completions for a prefix", function(){
        expect(t.autoComplete("beg")).toEqual(["begin", "beginner"]);
      });

      it("can recover a single completion", function(){
        expect(t.autoComplete("bea")).toEqual(["beast"]);
      });

      it("can recover a completion for the whole word", function(){
        expect(t.autoComplete("beast")).toEqual(["beast"]);
      });

      it("can recover many completions", function(){
        expect(t.autoComplete("be")).toEqual(["be", "begin", "beginner", "beast"]);
      });
      it("returns an empty array when there are no completions", function(){
        expect(t.autoComplete("a")).toEqual([]);
      });
    });

  });


});