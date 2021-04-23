# Fintech Project - Stock Analytics & Simulation Trading Platform

a web-based application that involves stock analytics and trading simulation


## Stock Search Page (Search Page)

+ Searching stock from different exchange code (e.g. US)
+ Searching stock by inputing stock symbols or stock name
+ all the stocks will be classified according to unique mic code
+ Uilized symbol searching function to help users to highlight the stock symbol in the output area in order to find stock we want search immediately
+ see the searching progress by progress bar (green one)

## Stock Visualization & Analytics (Detail Page)

+ Stock Basic Information Display
+ stock Price Trend Visualization
+ Candlestick Trend Visualizarion (将日期顺序从前到最近， 从左到右)
+ Latest Recommendation Index for reference of investment 
+ Company News Display (Records in the nearly half a year) 
+ Company Sentiment Analysis (未完成 - 从股票新闻情绪感知来分析股市情况)

## User Login 

+ system user role
    - admin

        - search stock
        - browse stock details and visulization
        - Check the order details including which user buy stock, or which user sell stock

    - member 
    
        -  Search and browser stock details and data visualization basically
        - browser the basic information including market new, IPO calendar etc..
        - Try to carry out simulation of stock trading 
        - provided with balance (default balance: 500000)
        - Check the stock order (已经完成)
        - Selected Stocks list (未购买)

    - nonmember

        - Search and browser stock details and data visualization basically
        - browser the basic information including market new, IPO calendar etc..
        - default balance: 0
        

## System Core Function: Stock Trade

- Main Implementation: Two Buttons (buy and sell) in detail page
- create stock order (Stock Model: SymbolTitle, Price, Volume, TotalPrice, Category, DateTime, Consultant (for association with User))

    - if user account not exist order, then create new order
    - else find that order 
        - new_price = new_price + old_price / 2
        - new_volume += old_volume
        - total_price = new_price * new_volume


- Set up association between User and Stock (one to many) e.g. a user can have multiple orders

    - User model (username, password, role, balance, asset ,tradeStatus (0,1), tradeCount (min = 0, max = 4), Client for assiciation with Stock)

- set up the business trading conditions: 

    - Buy Function

        + if user not exist order,  (新订单)
    
            + if balance >= 25000 and TradeStatus = 1, then
        
                - if balance >= totalPrice, then create new order (balance -= totalPrice && asset += totalPrice)
            
                    - if new balance < 25000 and tradeCount > 0, then set tradeStatus = 1, else set tradeStatus = 0

                        - 用户层变化： balance -= totalPrice && asset += totalPrice, tradeStatus
                        - 股票订单层： price， volume, totalPrice,category, datetime

                - else not buy 

            + if balance < 25000 and tradeStatus = 1 and tradeCount > 0, then 

                - if balance >= totalPrice, then buy it (balance -= totalPrice && asset += totalPrice && tradeCount - 1)
        
                    - if tradeCount == 0, then set tradeStatus = 0, else set tradeStatus = 1
                
                        - 用户层变化： balance -= totalPrice && asset += totalPrice, tradeStatus, tradeCount
                        - 股票订单层： price， volume, totalPrice,category, datetime
                    
                - else not buy
        
            + if balance < 25000  and tradeStatus = 0, then not buy
        
        + if user exist order, (旧订单，未卖完)
        
            + if balance >= 25000 and TradeStatus = 1, then

                - if balance >= totalPrice, then change old order (balance -= totalPrice && asset += totalPrice)

                    - if new balance < 25000 and tradeCount > 0, then set tradeStatus = 1, else set tradeStatus = 0

                        - 用户层变化： balance -= totalPrice && asset += totalPrice, tradeStatus
                        - 股票订单层： 
                            
                            - new_price = new_price + old_price / 2
                            - new_volume += old_volume
                            - totalPrice = new_price * new_volume
                            - new_category
                            - new_datetime  
                
                - else not buy 
            
            + if balance < 25000 and tradeStatus = 1 and tradeCount > 0, then    

                - if balance >= totalPrice, then buy it (balance -= totalPrice && asset += totalPrice && tradeCount - 1)
        
                    - if tradeCount == 0, then set tradeStatus = 0, else set tradeStatus = 1
                
                        - 用户层变化： balance -= totalPrice && asset += totalPrice, tradeStatus, tradeCount
                        - 股票订单层：同上
                
                - else not buy
            
            + if balance < 25000  and tradeStatus = 0, then not buy

    - Sell Function

        + if exist order, then 

            - if current hold volume >= input volume, then sell （balance += totalPrice && asset -= totalPrice）

                - if new balance >= 25000, then set tradeStatus = 1, tradeCount = 4, else set tradeStatus = 0

                - if new_order volume == 0, then delete this order

                - 用户层： （balance += totalPrice && asset -= totalPrice, tradeStatus, tradeCount）
                - 股票订单层

                    - new_price = new_price + old_price / 2
                    - new_volume = old_volume - new_volumn
                    - totalPrice = new_price * new_volume
                    - new_category
                    - new_datetime

        + if not exist order, then not sell

- show the order to member and admin



## Main Page (待定)

+ Market News Display
+ IPO calendar
+ Covid-19 data


## Administration Page

- List the table including order id, symbol name, price, volumn, category(buy or sell), datetime, who buy or sell it


### Version info

This app was originally generated on Sat Mar 06 2021 21:48:42 GMT+0800 (GMT+08:00) using Sails v1.3.1.

<!-- Internally, Sails used [`sails-generate@2.0.0`](https://github.com/balderdashy/sails-generate/tree/v2.0.0/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

