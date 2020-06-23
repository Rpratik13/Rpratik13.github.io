function searchByName(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]['name'].toString().toLowerCase() === val.toString().toLowerCase()) {
      return arr[i];
    }
  }
}


function searchByKey(arr, key, val) {
  if (key in arr[0]) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key].toString().toLowerCase() === val.toString().toLowerCase()) {
        console.log(arr[i]);
      }
    }
  } else {
    console.log("Key doesn't exist");
  }
}

var fruits = [
  { id: 1, name: 'Banana', color: 'Yellow' },
  { id: 2, name: 'Apple', color: 'Red' },
  { id: 3, name: 'Mango', color: 'Green' },
  { id: 4, name: 'Watermelon', color: 'Green' },
  { id: 5, name: 'Orange', color: 'Orange' }
];

// console.log(searchByName(fruits, 'apple'))
searchByKey(fruits, 'id', 3)