function sortBy(arr, key) {
  if (key in arr[0]) {
    if (isNaN(arr[0][key])) {
      for (var i = 1; i < arr.length; i++) {
        var idx = i;
        while (idx > 0 && ((arr[idx][key]).toString().toLowerCase() < arr[idx - 1][key].toString().toLowerCase())) {
          var temp = arr[idx];
          arr[idx] = arr[idx - 1];
          arr[idx - 1] = temp;
          idx--;
        }
      }
    } else {
      for (var i = 1; i < arr.length; i++) {
        var idx = i;
        while (idx > 0 && (arr[idx][key] < arr[idx - 1][key])) {
          var temp = arr[idx];
          arr[idx] = arr[idx - 1];
          arr[idx - 1] = temp;
          idx--;
        }
      }
    }
    return arr;
  } else {
    return "Key doesn't exist";
  }
}

var arr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Mary' },
  { id: 91, name: 'Andrew' },
  { id: 4, name: 'Benedict' },
  { id: 5, name: 'Louis' }
];

console.log(sortBy(arr, 'name'));