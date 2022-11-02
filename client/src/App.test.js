import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test('Test input values', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	expect(input.value).toBe('Amazon');
});

test('Test if table is displayed when clicked on submit', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	const button = document.getElementById('submit');
	fireEvent.click(button);
	const table = document.getElementById('stocksTable');
	expect(table).toBeTruthy();
});

test('Test if number of rows displayed is same as the time window', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	const timeWindow = document.getElementById('timeWindow');
	fireEvent.change(timeWindow, { target: { value: '5' } });
	const button = document.getElementById('submit');
	fireEvent.click(button);
	const table = document.getElementById('stocksTable');
});

test('Find if MACD is the difference of 12 days EMA and 26 days EMA', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	const timeWindow = document.getElementById('timeWindow');
	fireEvent.change(timeWindow, { target: { value: '5' } });
	const button = document.getElementById('submit');
	fireEvent.click(button);
	const table = document.getElementById('stocksTable');
	const tableRows = document.getElementsByTagName('tr');
	const tableColumns = tableRows[1].getElementsByTagName('td');
	const differenceOf12daysEMAand26daysEMA = parseFloat(tableColumns[4].innerHTML - tableColumns[5].innerHTML).toFixed(
		2
	);
	const MACD = tableColumns[6].innerHTML;
	expect(parseFloat(tableColumns[4].innerHTML - tableColumns[5].innerHTML).toFixed(2)).toBe(MACD);
});

test('Find if MACD is the difference of 12 days EMA and 26 days EMA', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	const timeWindow = document.getElementById('timeWindow');
	fireEvent.change(timeWindow, { target: { value: '5' } });
	const button = document.getElementById('submit');
	fireEvent.click(button);
	const table = document.getElementById('stocksTable');
	const tableRows = document.getElementsByTagName('tr');
	const tableColumns = tableRows[1].getElementsByTagName('td');
	const MACD = tableColumns[6].innerHTML;
	const signal = tableColumns[7].innerHTML;
	if (MACD < signal) {
		expect(tableColumns[8].innerHTML).toBe('sell');
	}
	if (MACD > signal) {
		expect(tableColumns[8].innerHTML).toBe('buy');
	}
});

test('Find if the final recommendation is compared based on Recommendation using MACD and social media recommendation', () => {
	render(<App />);
	const input = document.getElementById('stockSymbol');
	fireEvent.change(input, { target: { value: 'Amazon' } });
	const timeWindow = document.getElementById('timeWindow');
	fireEvent.change(timeWindow, { target: { value: '5' } });
	const button = document.getElementById('submit');
	fireEvent.click(button);
	const table = document.getElementById('stocksTable');
	const tableRows = document.getElementsByTagName('tr');
	const tableColumns = tableRows[1].getElementsByTagName('td');
	const MACDRecommendation = tableColumns[8].innerHTML;
	const socialmediaRecommendation = tableColumns[9].innerHTML;
	if (
		MACDRecommendation === 'buy' &&
		socialmediaRecommendation === 'Positive'
	) {
    expect(tableColumns[10].innerHTML).toBe('Strong Buy');
	} else if (
		MACDRecommendation === 'buy' &&
		socialmediaRecommendation === 'Negative'
	) {
		expect(tableColumns[10].innerHTML).toBe('Hold');
	} else if (
		MACDRecommendation === 'sell' &&
		socialmediaRecommendation === 'Positive'
	) {
    expect(tableColumns[10].innerHTML).toBe('Hold');
	} else if (
		MACDRecommendation === 'sell' &&
		socialmediaRecommendation === 'Negative'
	) {
		expect(tableColumns[10].innerHTML).toBe('Sell');
	}
});
