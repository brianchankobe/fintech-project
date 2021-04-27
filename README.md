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

## User Login 

+ system user role
    - admin

        - search stock
        - browse stock details and visulization

    - member 
    
        -  Search and browser stock details and data visualization basically
        - browser the basic information including market new
        - Try to carry out simulation of stock trading 
        - default wallet balance: 500000
        - Check the stock order (Holding & Sold Stock)

    - nonmember

        - Search and browser stock details and data visualization basically
        - browser the basic information including market new
        - default balance: 0

## Database Design

- Local Database
- Two Data Models

    - Stock (记录持有股票记录)

        - id
        - stock symbol name
        - price (买入价)
        - volume (买入量 - 以1股为最小单位)
        - totalCost (买入总价值累计)
        - totalRevenue (总收益)
        - totalVolume (总持有数)
        - valid (判断该订单记录是否有效 例如： 0 代表 用户依然持有， 1代表用户不持有该股)
        - category (操作类型。分为buy 和 sell 两个操作)
        - datetime 
        - consultant (一个对象可关联映射多个 User object)

    - User (用户)

## System Core Function: Stock Trade

- Main Implementation: Simulation Trading (Buy Action and Sell Action)



- Set up association between User and Stock (one to many) e.g. a user can have multiple orders

    - User model (username, password, role, balance, assets ,tradeStatus (0,1), tradeCount (min = 0, max = 4), Client for assiciation with Stock)

- set up the business trading conditions: 

    - Buy Function

        + if not exist stock buying record in user, （如果用户没有持有股票） 
    
            + if balance >= 25000 and TradeStatus = 1, then  （用户钱包金额大于25000， 可进行无限次 T+0买股）

                - if balance >= totalCost of buying, then create new stock record to record the total revenue and total cost and add record into user account and update user's information (user balance -= totalCost && user asset += totalCost)   （金额是否足够？）
            
                    - if new user balance < 25000, then set tradeCount = 4

                - else not buy 

            + if balance < 25000 and tradeStatus = 1, then  （用户钱包金额小于25000， 只能进行有限次 (4次) T+0买股， 四次以后补齐25000才可进行买股。）

                - if (balance >= totalCost && tradeCount > 0), then create new stock record to record the total revenue and total cost and add record into user account and update user's information (balance -= totalCost && asset += totalCost && tradeCount - 1)
        
                    - if tradeCount == 0, then set tradeStatus = 0  (冻结账户 - 不能购买只能减仓)
                    
                - else not buy
        
            + if balance < 25000  and tradeStatus = 0, then not buy   （账户被锁定，无法购买，只能减仓）
        
        + if exist stock record and valid in user, （用户之前已经购买过股票）

            + if balance >= 25000 and TradeStatus = 1, then 

                - if balance >= totalPrice, then change old record (volume, totalCost, price, totalVolume, category, datetime) (user balance -= totalPrice && user asset += totalPrice)   

                    - if new user balance < 25000, then set tradeCount = 4
                
                - else not buy 

            + if balance < 25000 and tradeStatus = 1, then 

                - if (balance >= totalPrice && tradeCount > 0), then changed old record (volume, totalCost (和之前累加), price, totalVolume (和之前累加), category, datetime)(balance -= totalPrice && asset += totalPrice && tradeCount - 1)

                    - if tradeCount == 0, then set tradeStatus = 0
                
                - else not buy

            + if balance < 25000  and tradeStatus = 0, then not buy


    - Sell Function

        + if exist stock order and valid in user, then  (卖股票必须之前用户持有)

            - if order volume > input volume, then changed order (volume, totalRevenue (累加), price, category, totalVolume(总股数-卖出股数), datetime) (balance += totalRevenue, asset -= totalRevuew) 
            
                (用户持有 > 预卖出数量）

                - if new balance >= 25000, then set tradeStatus = 1, tradeCount = 4

            - if order volume == input volume, then set valid to be 1 (表示订单已无效，清仓)，and (volume, totalRevenue (累加), price, category, totalVolume(总股数-卖出股数), datetime)  (balance += totalRevenue, asset -= totalRevuew) 
            
                (用户持有 = 预卖出数量）

            - if order volume < input volume, then not sell 
            
                (用户持有 < 预卖出数量）

        + if not exist order, then not sell

            (无法进行卖股票操作，无持有数量）

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

