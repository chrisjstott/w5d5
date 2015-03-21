Function.prototype.myBind = function (context) {
  var fn = this;
  return function () {
    fn.apply(context, Array.prototype.slice.apply(arguments, 1));
  };
};

var getMyNameFoo = function () {
  console.log ("My name is: " + this.name + " ");
};

function Snowman(name) {
  this.name = name;
}

var olaf = new Snowman("olaf");

getMyNameFoo();

getMyNameFoo.bind(olaf)();
