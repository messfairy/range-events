var print = function(){
    var args = Array.prototype.slice.call(arguments, 0);
    console.log(args.join('') + '\n');
};
var Item = {
    construct: function(name){
        this.name = name;
    },
    inspect: function(){
        print('it is ', this.name, '.');
    },
    kick: function(){
        print('klunk!')
    },
    take: function(){
        print('you cannot lift ', this.name, '.')
    }
};
var lantern = Item.create('the brass lantern');
lantern.kick();
lantern.take();

var DetailedItem = Item.extend({
    construct: function(name, details){
        Item.constructor.call(this, name);
        this.details = details;
    },
    inspect: function(){
        print('you see ', this.name, ', ', this.details, '.');
    }
});
var giantSloth = DetailedItem.create('the giant sloth', 'it is quietly hanging from a tree, munching leaves');
giantSloth.inspect();

var SmallItem = Item.extend({
    kick: function(){
        print(this.name, ' flies across the room.')
    },
    take: function(){
        print('you take ', this.name, '.');
    }
});
var pencil = SmallItem.create('the red pencil');
pencil.take();
print('pencil.isA(Item): ' + pencil.isA(Item));
print('pencil.isA(DetailedItem): ' + pencil.isA(DetailedItem));

var SmallDetailedItem = clone(DetailedItem);
mixInto(SmallDetailedItem, SmallItem);

var deadMouse = SmallDetailedItem.create('Fred the mouse', 'He is dead');
deadMouse.inspect();
deadMouse.kick();

var Monster = Item.extend({
    construct: function(name, dangerous){
        Item.construct.call(this, name);
        this.dangerous = dangerous;
    },
    kick: function(){
        if(this.dangerous){
            print(this.name, ' bites your head off.');
        }else{
            print(this.name, ' squeaks and runs away.');
        }
    }
});

var DetailedMonster = DetailedItem.extend({
    construct: function(name, description, dangerous){
        DetailedItem.constructor.call(this, name, description)
        Monster.constructor.call(this, name, dangerous);
    },
    kick: Monster.kick
});

var giantSloth = DetailedMonster.create('the giant sloth', 'it is quietly hanging from a tree, munchin leaves', true);
giantSloth.kick();