    
    let EMA =[];
    const moment = require('moment');
	//Calculate the previous EMA based on number of days. For 12 days EMA, 26 days EMA and signal
	export const previousEMA = (days, selectedStocks,timeWindow,keyName) => {
		let sum = 0;
		let previousEMA = 0;
        EMA = [];
		//const yesterday = formatDate(1);
		let arrayIndex = selectedStocks.findIndex((stock) => stock.date === formatDate(0));
		//Loop through the past days from the selected stocks array to find the total stock price
        let firstItemToFindEMA = arrayIndex + (parseInt(timeWindow)-1);
		for (let historicIndex = firstItemToFindEMA;historicIndex <firstItemToFindEMA + days; historicIndex++) {
			sum += selectedStocks[historicIndex].price;
		}
		previousEMA = sum / days;
        EMA.push(previousEMA);
        selectedStocks[firstItemToFindEMA][keyName] = previousEMA;
        selectedStocks[firstItemToFindEMA]["MACD"] = selectedStocks[firstItemToFindEMA]["12dayEMA"] - selectedStocks[firstItemToFindEMA]["26dayEMA"];
		return emaCalculatingFn(days, selectedStocks,firstItemToFindEMA,timeWindow,arrayIndex,keyName).slice(0,(parseInt(timeWindow)));
	};

    
	//Calculate the EMA based on Previous EMA
	export const emaCalculatingFn = (days, selectedStocks,firstItemToFindEMA,timeWindow,arrayIndex,keyName) => {
		let todaysClosingPrice = 0;
		let k = calculateSmoothingFactor(days);
		let todaysEMA = 0;
        let previousEMA = EMA[0];
        let todaysDate;
        //EMA of the first item in the time window given by user
        //Loop to iterate through all the stock prices for the given time window and to calculate EMA for each date.
        let maximumIndexOfElement  = parseInt(firstItemToFindEMA)+parseInt(timeWindow);
        for(let i = firstItemToFindEMA-1;i >= arrayIndex;i--){
            todaysClosingPrice = selectedStocks[i].price;
            todaysEMA = todaysClosingPrice * k + previousEMA * (1 - k);
            selectedStocks[i][keyName] = todaysEMA;
            previousEMA = todaysEMA;
            EMA.push(parseFloat(todaysEMA.toFixed(2)));
            //Calculate MACD
            if(keyName === "26dayEMA"){
                selectedStocks[i]["MACD"] = selectedStocks[i]["12dayEMA"] - selectedStocks[i]["26dayEMA"];
            }
        }
        let selectedStocksWithTimeRange = selectedStocks.filter((stock) => stock["12dayEMA"] != null);
		return selectedStocksWithTimeRange.slice(0,(parseInt(timeWindow)));
	};

    //Calculate signal. Signal line is the signal line which is the 9 day EMA of the MACD
    export const calculateSignal = (selectedStocks,timeWindow) =>{
        let lengthofArray = selectedStocks.length;
        let MACDAvg = 0;
        let MACDSum = 0;
        let todaysMACD = 0;
        let todaysSignal = 0;
        selectedStocks.forEach(obj => {
            MACDSum += obj.MACD;
        });
        MACDAvg = MACDSum/timeWindow;
        selectedStocks[lengthofArray-1]["signal"] = MACDAvg;
        for(let i=lengthofArray-2;i>=0;i--){
            todaysMACD = selectedStocks[i].MACD;
            todaysSignal = todaysMACD * (2/10) + MACDAvg * (1 - (2/10));
            selectedStocks[i]["signal"] = todaysSignal;
            MACDAvg = todaysSignal;
        }
        return selectedStocks.slice(0,(parseInt(timeWindow)));
    }

    export const recommendationsusingMACDfn = (selectedStocks,timeWindow) =>{
        for(let i=0; i<selectedStocks.length; i++){
            if(selectedStocks[i]["MACD"] < selectedStocks[i]["signal"]){
                selectedStocks[i]["recommendationusingMACD"] = "sell"
            }
            else{
                selectedStocks[i]["recommendationusingMACD"] = "buy"
            }
        }
        return selectedStocks.slice(0,(parseInt(timeWindow)));;
    }

    export const recommendationSocialMediaFn = (selectedStocks,timeWindow) =>{
        let socialMediaCountAvg = 0;
        let sum = 0;
        selectedStocks.forEach((stock) =>{
            sum += stock.socialMediaCount;
        })
        socialMediaCountAvg = sum/selectedStocks.length;
        for(let i=0; i<selectedStocks.length; i++){
            if(selectedStocks[i]["socialMediaCount"] < socialMediaCountAvg){
                selectedStocks[i]["socialMediaRecommendation"] = "Negative"
            }
            else{
                selectedStocks[i]["socialMediaRecommendation"] = "Positive"
            }
        }
        return selectedStocks.slice(0,(parseInt(timeWindow)));;
    }

    export const finalRecommendationFn = (selectedStocks,timeWindow) =>{        for(let i=0; i<selectedStocks.length; i++){
            if((selectedStocks[i]["recommendationusingMACD"] === "buy") && (selectedStocks[i]["socialMediaRecommendation"] === "Positive")){
                selectedStocks[i]["FinalRecommendation"] = "Strong Buy";
            }
            else if((selectedStocks[i]["recommendationusingMACD"] === "buy") && (selectedStocks[i]["socialMediaRecommendation"] === "Negative")){
                selectedStocks[i]["FinalRecommendation"] = "Hold";
            }
            else if((selectedStocks[i]["recommendationusingMACD"] === "sell") && (selectedStocks[i]["socialMediaRecommendation"] === "Positive")){
                selectedStocks[i]["FinalRecommendation"] = "Hold";
            }
            else if((selectedStocks[i]["recommendationusingMACD"] === "sell") && (selectedStocks[i]["socialMediaRecommendation"] === "Negative")){
                selectedStocks[i]["FinalRecommendation"] = "Sell";
            }
        }
        return selectedStocks.slice(0,(parseInt(timeWindow)));;
    }
    	//Calculate the smoothing factor based on number of days. For 12 days EMA, 26 days EMA and signal
	const calculateSmoothingFactor = (days) => {
		return 2 / (days + 1);
	};

	const formatDate = (days) => {
		const date = moment().subtract(days, 'day').toDate();
		return moment(date).format('YYYY-MM-DD');
	};