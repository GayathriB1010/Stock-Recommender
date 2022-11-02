# Assignment

Frontend library used : React

# Algorithm:

Stock recommendations are calculated based on MACD and social media count.

# MACD :

The moving average convergence divergence (MACD) indicator is a popular tool used by traders to help with their entry and exit points. 

# How to Calculate the MACD:

The MACD is a momentum-based trading indicator. This indicator can show changes in the speed of price movement and traders use to determine the direction of a trend.

The MACD is calculated by subtracting the 26-period Exponential moving average (EMA) from the 12 period EMA. This line is then plotted and this line is the MACD line.

A 9 day EMA of the MACD is then plotted on top of the MACD line and this serves as the line which can show traders the direction of the trend of the stock.

The EMA is used as opposed to SMA (simple moving average) as the EMA incorporates recent price swings more.

The formula for the Exponential moving average is:

EMA = (today’s closing price *K) + (Previous EMA * (1 – K))

N = number of days in EMA

K (Smoothing Factor) = 2/(N+1)

a) The first step is to obtain the closing prices of the stock you want to analyse. In our example we are using A2M.

Let calculate the 12 period EMA using the formula above.

The first value will be the average of the closing prices of the first 12 closing prices:

b) Then for the next period you can use the above EMA formula to calculate the 12 period EMA:

Lets use an 17/1/2019 as an example of the calculation:

EMA = (today’s closing price *K) + (Previous EMA * (1 – K))

=11.75 * (2/(12+1) + (10.7967 * (1 – (2/(12+1))

= 10.94333333

c) To obtain the 26 day period EMA we do the same thing but for the time period of 26 days.

The first value is the averages of the closing prices(see below screenshot) of the last 26 days and the same EMA formula is used to calculate the rest:

d) Once you have the values for the 12 day period EMA and the values for the 26 day period EMA, you subtract the 12 period EMA from the 26 day period EMA

f) We use the same EMA formula to calculate the 9 day EMA using the values of the MACD

g) Once you have all data for the MACD and Signal column use the two columns of data and plot a line chart.

# How to read the MACD indicator.

When the MACD crosses above the signal line then it is time to buy the stock. This is a bullish sign.

![image](https://user-images.githubusercontent.com/20083154/199382898-3c21931d-d9da-4417-b81a-82e4879713ca.png)


