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
--------------Note-----------------
===================================
1. For simplification when creating a hidden gem, the created hidden gem will only work as intended using the images stored in the images folder. If an image not stored in the images folder is used a broken link will be displayed on the created hidden gem.


