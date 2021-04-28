# Fintech Project - Stock Analytics & Simulation Trading Platform

a web-based application that involves stock analytics and trading simulation


## Software Installation

+ Installing Visual Studio Code
+ Open terminal and type `npm install -g sails`
+ Type `sails new <project name>` 
+ Run `npm install finnhub`
+ Run web appication using `sails lift`
+ `sails lift` may need to choose 1 or 2 (1: run for base of original DB, 2: drop the DB content and run again)
+ You may use http://localhost:1337/ to open it.

## Stock Search Page (Search Page)

+ Searching stock from different exchange code (e.g. US)
+ Searching stock by inputing stock symbols or stock name
+ all the stocks will be classified according to unique mic code
+ Uilized symbol searching function to help users to highlight the stock symbol in the output area in order to find stock we want search immediately
+ see the searching progress by progress bar (green one)

## Stock Visualization & Analytics (Detail Page)

+ Stock Basic Information Display
+ stock Price Trend Visualization
+ Candlestick Trend Visualizarion 
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
        - consultant (主要 one-to-many one USER with many STOCK)

    - User (用户)

        - id
        - username
        - password
        - role
        - balances
        - tradeStatus (0: 账户不可买， 1： 账户可买)
        - tradeCount （min = 0 max = 4）
        - clients  (一个对象可关联映射多个 Stock object)

## System Core Function: Stock Trade

- Main Implementation: Simulation Trading (Buy Action and Sell Action)


- setting up business logic of trading (主要针对美股): 


    1. User still doesn't have stock record , they need to create one stock record.

    2. User aleady had one, only need to change the value in the record that is alrady created

    3. Input Form: Price (At most two decimal digit e.g. 3.14), Volume (should be integer)

    4. (For Buying) price >= market price

    5. (For Selling) price <= market price

    6. (Buying) Total Value (price * volume) <= user balance. Otherwise, it cannot buy.

    7. (Selling) User must hold stock record which is valid (valid = 0) (代表用户持有股票可卖), otherwise, it cannot be sold.

    8. (According to US stock rules) there are some rules setting here for buying

        - user balance >= 25000 and tradeStatus = 1， it can carried out T+0 trading (T+0： 当日可以进行无限次交易)
            - if user balance < 25000 (after buying stock), set tradeCount = 4 (In later trading, it only can carried out buying action four times until user can have >= $25000 balance)
            
        - user balance < 25000 and tradeCount > 0, it can carry out T+0 trading ( tradeCount - 1.)
            - if tradeCount == 0 (After minus one), set tradeStatus = 0 (Lock the account for buying, only can sell.)
        
        - user balance < 25000 and tradeStatus == 0, user cannot buy but it can only sell. (Pay attention: User should have >= 25000, the account can be actviated again)

    9. (For buying) Success buying will have following changed:
        - balance - totalCost (price * volume) 
        - TotalCost (everytime it will accumulate)
        - totalVolume (everytime it will accumulate)
        - TradeCount - 1 (only when user balance < 25000)
        - tradeCount == 0, set tradeStatus to be 0 (冻结)
        
    10. （For Selling） Success selling will have following changing:
        - balance + totalRevenue (price * volume) (卖出价 * 卖出书)
        - totalRevenue (everytime it will accumulate)
        - Total volume (everytime it will decrease) (减持股份)
        - valid = 1 (all stock were sold out)
        - if balance >= 25000 (after selling), set tradeStatus = 1, tradeCount = 4 (恢复T+0无限次交易)
        - Selling 需要满足几个条件：
            - 必须持有股票
            - total holding volume > inputed volume, (余额增加，持股减少，总收入增加)
            - total holding volume = inputed volume, (余额增加，持股为0，总收入增加，valid = 1 - 订单无效)
            - total holding volume < inputed volume, (无法售出)

    11. data form: volume cannot be zero (min == 1)


## My Trading Page

+ Holding Stock (for showing the stock that user is holding now)
    - it can get new profit via button

+ Sold Out Stock (those are already sold by user)
    - it can also see the profit after selling out all of stocks


### Version info

This app was originally generated on Sat Mar 06 2021 21:48:42 GMT+0800 (GMT+08:00) using Sails v1.3.1.

## Contribution

+ CHAN YEUNG YEH (System Developer & Frontend Designer)
+ CHEN SHANG HUA (System Developer & Frontend Designer)

<!-- Internally, Sails used [`sails-generate@2.0.0`](https://github.com/balderdashy/sails-generate/tree/v2.0.0/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

