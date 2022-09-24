let test = [{obj: 0}, {obj:2}]

console.log(test)

test.forEach(item => item.obj = 3)

console.log(test)