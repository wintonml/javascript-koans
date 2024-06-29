var _; //globals

/**
 * @param {number} num
*/
function isPrimeNumber(num){
  if(num <= 1) return false;
  if(num <= 3) return true;

  for(i = 2; i <= (num / 2); i++){
    if(num % i === 0){
      return false;
    };
  }

  return true;
}

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var isMushrooms = function(x) { return x === "mushrooms" };

      productsICanEat = products.filter(x => !x.containsNuts && !_(x.ingredients).any(isMushrooms));

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    /* try chaining range() and reduce() */

    var sum = _.range(1000).reduce(
      (total, current) => (current % 3 === 0 || current % 5 === 0) ? total + current : total, 0);

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount["mushrooms"] = _(products).chain()
                       .map(x => x.ingredients) // [["artichoke", "sundried tomatoes", "mushrooms"], ["roma", "sundried tomatoes", "goats cheese", "rosemary"]]
                       .flatten() // ["artichoke", "sundried tomatoes", "mushrooms", "roma", "sundried tomatoes", "goats cheese", "rosemary"]
                       .reduce((total, ingredient) => ingredient === "mushrooms" ? total + 1 : total, 0)
                       .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/

  it("should find the largest prime factor of a composite number", function () {
    /**
     * This will ignore the factors of 1 and the number passed in.
     * @param {number} num
    */
    function getFactors(num){
      var factors = [];

      for(i = 2; i <= (num / 2); i++){
        if(num % i === 0){
          factors.push(i)
        };
      }

      return factors;
    }

    /**
     * @param {number} num
    */
    function getLargestPrimeFactor(num){
      if(isPrimeNumber(num)){ return "Enter a composite number" }
      var allFactors = getFactors(compositeNumber);
      var primeFactors = allFactors.filter(x => getFactors(x).length === 0)

      return primeFactors.pop();
    }

    var compositeNumber = 6;
    var largestPrimeFactor = getLargestPrimeFactor(compositeNumber);
    expect(largestPrimeFactor).toBe(3)

    compositeNumber = 10;
    largestPrimeFactor = getLargestPrimeFactor(compositeNumber);
    expect(largestPrimeFactor).toBe(5)

    compositeNumber = 51;
    largestPrimeFactor = getLargestPrimeFactor(compositeNumber);
    expect(largestPrimeFactor).toBe(17)

    compositeNumber = 7;
    largestPrimeFactor = getLargestPrimeFactor(compositeNumber);
    expect(largestPrimeFactor).toBe("Enter a composite number")
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    /**
     * @param {number} num
    */
    function isPalindrome(num){
      var numAsString = num.toString();

      return numAsString === numAsString.split("").reverse().join("");
    }

    var max = 0;
    var num1 = 0;
    var num2 = 0;

    for(i = 999; i > 99; i--){
      for(j = i; j > 99; j--){
        var product = i * j;
        if(isPalindrome(product) && product > max){
          max = product;
          num1 = i;
          num2 = j;
        }
      }
    }

    expect(max).toBe(906609);
    expect(num1).toBe(993);
    expect(num2).toBe(913);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    /**
     * @param {number} num
    */
    function isDivisibleByAllNumbersFromTwoToTwenty(num){
      for(i = 20; i > 1; i--){ // don't need to include 1
        if(num % i !== 0 ){
          return false
        }
      }
      return true;
    }

    var foundSmallestDivisibleNumberOfNumbersOneToTwenty = false;
    var potentialSmallestDivisibleNumberOfNumbersOneToTwenty = 370; // 20 * 19 cannot be smaller than the product of the two largest numbers (+10 when we get into the loop)

    while(!foundSmallestDivisibleNumberOfNumbersOneToTwenty){
      potentialSmallestDivisibleNumberOfNumbersOneToTwenty += 10;
      foundSmallestDivisibleNumberOfNumbersOneToTwenty = isDivisibleByAllNumbersFromTwoToTwenty(potentialSmallestDivisibleNumberOfNumbersOneToTwenty);
    }

    expect(potentialSmallestDivisibleNumberOfNumbersOneToTwenty).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    /**
     * @param {number} num
    */
    function calculateSumOfSquares(num){
      var rangeOfNumbers = _.range(1, num + 1); // the end range is exclusive so need to increment it by 1
      return rangeOfNumbers.reduce(
        (total, current) => total + Math.pow(current, 2), 0);
    }

    /**
     * @param {number} num
    */
    function calculateSquareOfSums(num){
      var rangeOfNumbers = _.range(1, num + 1);
      return Math.pow(rangeOfNumbers.reduce(
        (total, current) => total + current, 0), 2);
    }

    /**
     * @param {number} num
    */
    function findDifferenceBetweenSumOfSquaresAndSquareOfSums(num){
        return Math.abs(calculateSquareOfSums(num) - calculateSumOfSquares(num))
    }

    var n = 2;
    var difference = findDifferenceBetweenSumOfSquaresAndSquareOfSums(n);
    expect(calculateSquareOfSums(n)).toBe(9);
    expect(calculateSumOfSquares(n)).toBe(5);
    expect(difference).toBe(4);

    n = 3;
    difference = findDifferenceBetweenSumOfSquaresAndSquareOfSums(n);
    expect(calculateSquareOfSums(n)).toBe(36);
    expect(calculateSumOfSquares(n)).toBe(14);
    expect(difference).toBe(22);

    n = 5;
    difference = findDifferenceBetweenSumOfSquaresAndSquareOfSums(n);
    expect(calculateSquareOfSums(n)).toBe(Math.pow(15,2));
    expect(calculateSumOfSquares(n)).toBe(1 + 4 + 9 + 16 + 25);
    expect(difference).toBe(170);
  });

  it("should find the 10001st prime", function () {
    var count = 0;
    var number = 0;

    while(count !== 10001){
      number++;
      if(isPrimeNumber(number)){
        count++;
      }
    }
    expect(number).toBe(104743);
  });

});
