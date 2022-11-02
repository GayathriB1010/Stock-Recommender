import styled from "styled-components";
import Plot from 'react-plotly.js';
import { useState } from "react";

//Component to display the stock recommendation and historic graph. For graph, the library used is plotly.js
const StocksTable = (stocksArrayAfterCalculation) =>{
    const xAxis = stocksArrayAfterCalculation.stocksToDisplay.map((stock) =>{
        return stock.date;
    })
    const macdYAxis = stocksArrayAfterCalculation.stocksToDisplay.map((stock) =>{
        return parseFloat(stock.MACD).toFixed(2);
    })
    const signalYAxis = stocksArrayAfterCalculation.stocksToDisplay.map((stock) =>{
        return parseFloat(stock.signal).toFixed(2);
    })
       let graphData= [
          {
            x: xAxis,
            y: macdYAxis,
            fill: 'tozeroy',
            type: 'scatter',
            name: 'MACD'
          },
          {
            x: xAxis,
            y: signalYAxis,
            fill: 'tonexty',
            type: 'scatter',
            name: 'Signal'
          }];
   return (
        <>
        <H4>Today's Stock Recommendation for {stocksArrayAfterCalculation.stocksToDisplay[0].stockSymbol} is {stocksArrayAfterCalculation.stocksToDisplay[0].FinalRecommendation}</H4>
        <Table id="stocksTable">
          <TableRow>
            {Object.keys(stocksArrayAfterCalculation.stocksToDisplay[0]).map((key) => (
              <TableHeader>{key}</TableHeader>
            ))}
          </TableRow>
          {stocksArrayAfterCalculation.stocksToDisplay.map((item) => (
            <TableRow key={item.id}> 
              {Object.values(item).map((val) => (
                  typeof(val) === "number"?<TableData>{parseFloat(val).toFixed(2)}</TableData>:<TableData>{val}</TableData>
              ))}
            </TableRow>
          ))}
        </Table>
        <Graph>
        <Plot
      data={graphData}
      layout={ {width: 400, height: 400, title: 'MACD indicator'} } />
      </Graph>
        </>
      );
    }
    
const Wrapper = styled.div`

`
const Table = styled.table`
border-collapse: collapse;
border: 1px solid black;
width: 50%;
position:absolute;
left :24%;
top:15%;
background: white;
box-sizing: border-box;
box-shadow: 10px 10px 10px black;
table-layout: fixed;
`
const TableHeader = styled.th`
border: 1px solid black;
text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 10px;
    width: 110px;
  overflow: hidden;
  word-wrap: break-word;
  background:#6699cc;
`
const TableRow = styled.tr``

const TableData = styled.td`
border: 1px solid black;
width:50%;
width: 100px;
  overflow: hidden;
  text-align: center;
  padding:10px;
`
const H4 = styled.h4`
color: White;
text-align:center;
`
const Graph = styled.div`
position:absolute;
top:50%;
left:10px;
`
export default StocksTable;