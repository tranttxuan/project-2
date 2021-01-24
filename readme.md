# BEAR BEER COMPANY - SECOND PROJECT

## The main goad of this app is to advertise and sell beers. 

* Admin can CRUD all products in the company and check pending orders. 
* All user can see list of products, each product's detail and filter them by name, category or price. Beside, hey can add chosen products to their shopping cart and checkout.
* Moreover, users can signup, login, logout their account, update their profile and their wishlist.

[Demo](https://bear-beer-co.herokuapp.com/)

## Routes
|Method       |Route          |Description |
|--- | --- | --- |
|GET   |/       | Show first page of website      |
|GET       |/collection       |Show all products and filtering tool       |
|GET       |/collection/:id      |Show detail of a chosen product       |
|GET       |/dashboard/products-mange       |Show table of all products and CRUD operations; show table of pending orders       |
|GET       |/dashboard/product-add       |Show form to add a new product      |
|POST       |/dashboard/product-add        |Add a new product in database        |
|GET       |/dashboard/product-edit/:id         |Show detail of selected product      |
|POST       |/dashboard/product-edit/:id       | Edit detail selected product in database      |
|GET      |/product-delete/:id       |Delete selected product in database      |
|GET      |/auth/signup       |Show form to signup       |
|POST       |/auth/signup          |Add a new user to database       |
|GET       |/auth/login       |Show form to login       |
|POST       |/auth/login      |Save the user in the session       |
|GET       |/auth/logout       |Logout current account       |
|GET       |/user/profile       |Show profile of logged in user     |
|POST       |/user/profile        |Update profile of logged in user       |
|GET       |user/wishlist/list       |Show wishlist of logged-in user       |
|GET       |user/wishlist/product-delete/:id     |Delete a selected product in wishlist of logged-in user       |
|POST       | /user/wishlist/product-add/:id      |Add a chosen product to wishlist (Axios call) |
|GET       |/shoppingcart       | Show list of products which have added in shopping cart     |
|GET       |/shoppingcart/checkout/checkprofile       |Show current user's information       |
|POST       |/shoppingcart/checkout/checkprofile       |Update current user's profile before checkout       |
|GET       |/shoppingcart/checkout       |Send thanks to client who has ordered products      |
|GET       |/shoppingcart/delete/:id         |Delete a selected product in shopping cart       |
|POST       |/shoppingcart/:id         |Add a chosen product to shopping cart       |
|GET  (Axios call)     |/api/manage      |Send a JSON response composed of all products(Axios call)  |
|GET       |/api/manage/filter/:category       |Send a JSON response composed of list of products which have same this category(Axios call)  |
|GET       |/filter/price/:smallestPrice/:largestPrice       |Send a JSON response composed of list of products which have filter by price(Axios call)      |
