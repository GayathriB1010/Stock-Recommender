import { useEffect } from "react";
import { useState } from "react"
import styled from "styled-components";
import { stocks } from "./data";


const Homepage = () =>{
    //State to set the time window
    const[timeWindow,setTimeWindow] = useState(null);
    //State to set the stock symbol
    const[stockSymbol,setStockSymbol] = useState(null);

    //Function to display the table with stock symbol, price , date , social media count and buy/hold or sell recommendation
    const displayTable = (e) =>{
        e.preventDefault();
        let selectedStocks = stocks.filter((stock) =>{
            return stock.stockSymbol === stockSymbol;
        })
        console.log(selectedStocks);
    }
    return(
        <Wrapper>
            <Form onSubmit = {(e) => displayTable(e)}>
            <Header>User Input</Header>
            <StartDate>
                <label className="timeWindow">Time Window</label>
                <Input type="text" className="timeWindow" placeholder="Choose between 1 to 20 days" defaultValue="10" onChange={(e)=>{setTimeWindow(e.target.value) }}required/></StartDate>
            <StockSymbol>
                <label className="stockSymbol">Stock Symbol</label>
                <Input type = "text" className="stockSymbol" onChange={(e)=>{setStockSymbol(e.target.value)}}required/>
            </StockSymbol>
            <SubmitButton>
                <Button type="submit">Submit</Button>
            </SubmitButton>
            </Form>
            </Wrapper>
    )
}

const Wrapper = styled.div`
display:flex;
flex-direction:column;
align-items:left;
`
const Header = styled.div`
font-size:30px;
`
const StartDate = styled.div`
`
const EndDate = styled.div`
`
const StockSymbol = styled.div`
`

const Input = styled.input`
padding:10px;
margin:10px;
`
const Form = styled.form`
`
const SubmitButton = styled.div`
`
const Button = styled.button`
`

export default Homepage