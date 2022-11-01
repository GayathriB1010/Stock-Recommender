//Random data of stocks with stock symbol, date, price and social media count

let stocks =[
     ]
  
const stockNames = ['Amazon','Google','Tesla','NVDIA','flipkart'];
 
function subtractDays(numOfDays, date = new Date()) {
    date.setDate(date.getDate() - numOfDays);
  
    return date.toLocaleDateString();
  }

const addStocks =() =>{
    for(let numberofIterations=0; numberofIterations<=20; numberofIterations++){
    stockNames.forEach((stock) =>{
    const stockData =({
        stockSymbol : stock,
        date : subtractDays(numberofIterations,new Date("2022-10-31")),
        price : Math.floor(Math.random() * (1000 - 50 + 1)) + 50,
        socialMediaCount : Math.floor(Math.random() * (500 - 50 + 1)) + 50,
    })
    stocks.push(stockData);
})
}
}

addStocks();
console.log(stocks);
module.exports = {
    stocks,
};