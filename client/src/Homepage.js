import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { stocks } from "./utils/data";
import { emaCalculatingFn,previousEMA,calculateSignal,recommendationsusingMACDfn,recommendationSocialMediaFn,finalRecommendationFn } from './utils/calculations';
import StocksTable from './StocksTable';
import Header from './Header';

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
        let selectedStocks = [];
        setStocksArrayAfterCalculation(null);
		selectedStocks = stocks.filter((stock) => {
			return stock.stockSymbol === stockSymbol;
		});
		const twelveDaysEMA = previousEMA(12, selectedStocks,timeWindow,"12dayEMA");
        const twentysixDaysEMA = previousEMA(26, selectedStocks,timeWindow,"26dayEMA");
        const signal = calculateSignal(twentysixDaysEMA,timeWindow);
        const recommendationsuingMACD = recommendationsusingMACDfn(signal,timeWindow);
        const recommendationusingSocialMedia = recommendationSocialMediaFn(recommendationsuingMACD,timeWindow);
        const finalRecommendation = finalRecommendationFn(recommendationusingSocialMedia,timeWindow);
        setStocksArrayAfterCalculation(finalRecommendation);
        setShowTable(true);
	};

	return (
		<Wrapper>
            <Header></Header>
			<Form onSubmit={(e) => displayTable(e)}>
				<StartDate>
					<label className="timeWindow">Time Window(1 to 25 days)</label>
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
					<Button disabled={timeWindow>25 || timeWindow<1} type="submit" id="submit">Submit</Button>
				</SubmitButton>
			</Form>
            {showTable === true? <StocksTable stocksToDisplay={stocksArrayAfterCalculation}/>:null}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: left;
`;
const StartDate = styled.div``;
const EndDate = styled.div``;
const StockSymbol = styled.div``;

const Input = styled.input`
width: 100%;
padding: 10px 0;
font-size: 16px;
color: black;
margin-bottom: 30px;
border: none;
border-bottom: 1px solid black;
outline: none;
background: transparent;
`;
const Form = styled.form`
position: absolute;
top: 30%;
left: 11%;
width: 400px;
padding: 40px;
transform: translate(-50%, -50%);
background: white;
box-sizing: border-box;
box-shadow: 0 15px 25px rgba(0,0,0,.6);
border-radius: 10px;
`;
const SubmitButton = styled.div``;
const Button = styled.button`
outline: none;
background: transparent;
`;
const H3 = styled.h3`
margin-left:10px;
margin-bottom:10px;
font: 400 1rem Verdana, Geneva, Tahoma, sans-serif;
`
export default Homepage;
