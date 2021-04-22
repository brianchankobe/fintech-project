# Fintech Project - Stock Analytics & Simulation Trading Platform

a web-based application that involves stock analytics and trading simulation


## Stock Search Page (Search Page)

+ Searching stock from different exchange code (e.g. US)
+ Searching stock by inputing stock symbols or stock name
+ all the stocks will be classified according to unique mic code
+ Uilized symbol searching function to help users to highlight the stock symbol in the output area in order to find stock we want search immediately

## Stock Visualization & Analytics (Detail Page)

+ Stock Basic Information Display
+ stock Price Trend Visualization
+ Candlestick Trend Visualizarion (将日期顺序从前到最近， 从左到右)
+ Latest Recommendation Index for reference of investment ()
+ Company News Display (Records in the nearly half a year) 
+ Company Sentiment Analysis (未完成 - 从股票新闻情绪感知来分析股市情况)

## User Login 

+ system user role
    - admin

        - Check the order details including which user buy stock, or which user sell stock

    - member 
    
        -  Search and browser stock details and data visualization basically
        - browser the basic information including market new, IPO calendar etc..
        - Try to carry out simulation of stock trading 
        - provided with balance (default balance: 5000000)
        - Check the stock order

    - nonmember

        - Search and browser stock details and data visualization basically
        - browser the basic information including market new, IPO calendar etc..
        - No right for simulation of stock trading
        - default balance: 0
        


## Main Page (待定)

+ Market News Display
+ IPO calendar
+ Covid-19 data


## Stock Trading


### Version info

This app was originally generated on Sat Mar 06 2021 21:48:42 GMT+0800 (GMT+08:00) using Sails v1.3.1.

<!-- Internally, Sails used [`sails-generate@2.0.0`](https://github.com/balderdashy/sails-generate/tree/v2.0.0/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

