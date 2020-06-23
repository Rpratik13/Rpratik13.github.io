var output = {}
var counter = 1

function normalizeArray(children) {
  var childNums = [];
  for (var j = 0; j < children.length; j++) {
    output[counter] = children[j];
    childNums.push(counter);
    counter += 1;
    if ('children' in children[j]) {
      children[j]['children'] = normalizeArray(children[j]['children']);
    }

  }
  return childNums;

}

function normalize(inp) {
  var inpKeys = Object.keys(inp)
  for (var i = 0; i < inpKeys.length; i++) {
    output[counter] = inp[inpKeys[i]];
    tempCount = counter;
    counter += 1;
    output[tempCount]['children'] = normalizeArray(inp[inpKeys[i]]['children'])
  }
}

var input = {
  '1': {
    id: 1,
    name: 'John',
    children: [
      { id: 2, name: 'Sally' },
      { id: 3, name: 'Mark', children: [{ id: 4, name: 'Harry' }] }
      ]
  },
  '5': {
    id: 5,
    name: 'Mike',
    children: [{ id: 6, name: 'Peter' }]
  }
};

normalize(input);
console.log(output);