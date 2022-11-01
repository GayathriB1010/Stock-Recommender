import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { stocks } from './data';
import { emaCalculatingFn,previousEMA,calculateSignal } from './utils/calculations';
import StocksTable from './StocksTable';

const Homepage = () => {
	//State to set the time window
	const [ timeWindow, setTimeWindow ] = useState(10);
	//State to set the stock symbol
	const [ stockSymbol, setStockSymbol ] = useState(null);
    //State to set show table
    const [ showTable, setShowTable ] = useState(false);
    //State to set stocks
    const [ stocksArrayAfterCalculation, setStocksArrayAfterCalculation] = useState(null);

	//Function to display the table with stock symbol, price , date , social media count and buy/hold or sell recommendation
	const displayTable = (e) => {
		e.preventDefault();
		let selectedStocks = stocks.filter((stock) => {
			return stock.stockSymbol === stockSymbol;
		});
		const twelveDaysEMA = previousEMA(12, selectedStocks,timeWindow,"12dayEMA");
        const twentysixDaysEMA = previousEMA(26, selectedStocks,timeWindow,"26dayEMA");
        const signal = calculateSignal(twentysixDaysEMA,timeWindow);
        setStocksArrayAfterCalculation(signal);
		//const twentysixDaysEMA = previousEMA(26, selectedStocks,timeWindow);
		// const signal = 15;
		// // moving average convergence divergence (MACD) indicator
		// let MACD = twentysixDaysEMA - twelveDaysEMA;
        // if(MACD < signal){
        //     console.log("Sell");
        // }
        // else{
        //     console.log("Buy");
        // }
        //console.log(selectedStocks)
        setShowTable(true);
	};

    console.log(stocksArrayAfterCalculation);
	return (
		<Wrapper>
			<Form onSubmit={(e) => displayTable(e)}>
				<Header>User Input</Header>
				<StartDate>
					<label className="timeWindow">Time Window(0 to 20 days)</label>
					<Input
						type="text"
						className="timeWindow"
                        id="timeWindow"
						defaultValue="10"
						onChange={(e) => {
							setTimeWindow(e.target.value);
						}}
						required
					/>
				</StartDate>
				<StockSymbol>
					<label className="stockSymbol">Stock Symbol</label>
					<Input
						type="text"
						className="stockSymbol"
                        id="stockSymbol"
						onChange={(e) => {
							setStockSymbol(e.target.value);
						}}
						required
					/>
				</StockSymbol>
				<SubmitButton>
					<Button type="submit" id="submit">Submit</Button>
				</SubmitButton>
                {showTable === true? <p>{stocksArrayAfterCalculation[0]["12dayEMA"]}</p>:null}
			</Form>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
`;
const Header = styled.div`font-size: 30px;`;
const StartDate = styled.div``;
const EndDate = styled.div``;
const StockSymbol = styled.div``;

const Input = styled.input`
	padding: 10px;
	margin: 10px;
`;
const Form = styled.form``;
const SubmitButton = styled.div``;
const Button = styled.button``;

export default Homepage;
