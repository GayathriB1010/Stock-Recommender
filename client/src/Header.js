import logo from "./utils/logo.jpg";
import styled from "styled-components";

const Header = () =>{
    return(
        <Wrapper>
           <Head>
                <LogoAndName>
                <Img src={logo}/>
                <NameAndDescription>
                <Name>Money Smart</Name>
                <Description>Stock Recommendation System</Description>
                </NameAndDescription>
                </LogoAndName>
           </Head>
           </Wrapper>
    )
}

const Head = styled.div`
color : black;
display:flex;
font-size:30px;
`
const Img = styled.img`
height : 5rem;
width :5rem;
margin:10px 0 0 10px;
`
const Name = styled.div`
font: 900 2rem Verdana, Geneva, Tahoma, sans-serif;
margin-top:20px;

`
const LogoAndName = styled.div`
display:flex;
margin-bottom:10px;
`;

const Wrapper = styled.div`
background:	
white;
`
const NameAndDescription = styled.div`
display:flex;
flex-direction:column;
margin-left : 25px;
color:#141e30;;
`

const Description = styled.div`
color : rgba(0,144,144,1);
font: 200 .75rem Verdana, Geneva, Tahoma, sans-serif;
margin-top:8px;
color:black;
`
export default Header;