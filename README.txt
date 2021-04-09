===================================
-------------Set Up----------------
===================================
1. Save files into the root directory of WAMP/MAMP. (/wamp64/www/..)

2. Run WAMP/MAMP server

3. Load Database File
Dir: "/dbLoad.sql"

4. If using MAMP, change the dbURL of each service in the docker-compose.yml file accordingly.

5. Run the command "docker-compose up --build" to build the required images and run the containers.

===================================
-------Accessing The UI------------
===================================
1. Users will be required to Login before they can gain access to the pages.

2. To login the user can login via the index.html page or visit any of the pages and be redirected to the login page.

Preloaded user accounts
-----------------------------------
Email: htht@gmail.com
Password: 123456
-----------------------------------
===================================
---Accessing Grafana Dashboard-----
===================================
1. After services start running access the Dashboard via http://localhost:3000

2. Login to admin account
-----------------------------------
Username: admin
Password: admin
-----------------------------------

3. On the Home Page select the configured KrakenD Dashboard to view the Metrics.

4. By default the Dashboard shows metrics for the past 12 hours, change the time range to view on the top right in order to view metrics for a longer time period.

===================================
--------------Note-----------------
===================================
1. For simplification when creating a hidden gem, the created hidden gem will only work as intended using the images stored in the images folder of the root directory. If an image not stored in the images folder is used a broken link will be displayed on the created hidden gem.

2. Access to the Travel Local Enterprise Solution is via the API Gateway only, thus the endpoints for atomic service will not be directly reachable via Postman/Browsers. 

3. To have direct access to the atomic services, run the python file for the atomic services directly instead of using docker. (i.e. to access hiddengem microservice directly, run the hiddengem.py script directly)
