<h1 align="center">
  Ecommerce-API Rest
</h1>

<h1 align="center">
  Route List
</h1>

[Base URL](https://rest-comerce.herokuapp.com/)</b>


| USER        | Method  | url           | TokenJWTValidate| AuthAdmin| Other|
|-------------|---------|---------------|-----------------|----------|------|
| Login       | POST    | /user/login   | ❌              | ❌      | ❌   |
| Register    | POST    | /user/register| ❌              | ❌      | ❌   |
| GetByID     | GET     | /user/info    | ✔               | ❌      | ❌   |
| AddToCart   | PATCH   | /user/add_cart| ✔               | ❌      | ❌   |
| Payments    | GET     | /user/payments| ✔               | ❌      | ❌   |

| CATEGORIES              | Method  | url               | TokenJWTValidate| AuthAdmin| Other|
|-------------------------|---------|-------------------|-----------------|----------|------|
| GetCategories           | GET     | /api/category     | ❌              | ❌      | ❌   |
| CreateCategory          | GET     | /api/category     | ✔               | ✔       | ❌   |
| GetCategoryByID         | GET     | /api/category/:id | ✔               | ❌      | ❌   |
| UpdateCategoryByID      | PUT     | /api/category/:id | ✔               | ✔       | ❌   |
| DeleteCategoryByID      | DELETE  | /api/category/:id | ✔               | ✔       | ❌   |

| PRODUCTS               | Method  | url               | TokenJWTValidate| AuthAdmin| Other|
|------------------------|---------|-------------------|-----------------|----------|------|
| GetProducts            | GET     | /api/products     | ❌              | ❌      | ❌   |
| CreateProduct          | GET     | /api/products     | ✔               | ✔       | ❌   |
| GetProductByID         | GET     | /api/products/:id | ✔               | ❌      | ❌   |
| UpdateProductByID      | PUT     | /api/products/:id | ✔               | ✔       | ❌   |
| DeleteProductByID      | DELETE  | /api/products/:id | ✔               | ✔       | ❌   |
