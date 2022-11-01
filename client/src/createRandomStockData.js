const stockNames = ['Amazon','Google','Tesla','NVDIA','flipkart'];
let stocks = [];

function subtractDays(numOfDays, date = new Date()) {
date.setDate(date.getDate() - numOfDays);

return date.toLocaleDateString();
}

const addStocks =() =>{
for(let numberofIterations=0; numberofIterations<=10; numberofIterations++){
stockNames.forEach((stock) =>{
const stockData =({
   stockSymbol : stock,
   date : subtractDays(numberofIterations,new Date("2022-11-11")),
   price : Math.floor(Math.random() * (1000 - 50 + 1)) + 50,
   socialMediaCount : Math.floor(Math.random() * (500 - 50 + 1)) + 50,
})
stocks.push(stockData);
})
}
}

addStocks();
console.log(stocks);