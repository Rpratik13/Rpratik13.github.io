function transform(numbers) {
  for (i = 0; i < numbers.length; i++) {
    numbers[i] *= 2;
  }
  return numbers;
}

var numbers = [1, 2, 3, 4];
console.log(transform(numbers));