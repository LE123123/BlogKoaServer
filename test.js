const obj = {
  name: 'hyunseo',
  age: 21,

  print: function () {
    const print_this = function () {
      console.log('print_this >> ', this);
    };
    print_this();

    const print_this2 = () => {
      console.log('print_this2 >> ', this);
    };

    print_this2();
  },
};

obj.print();
