
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/articles"
  },
  {
    "renderMode": 2,
    "route": "/admin/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/admin/shops"
  },
  {
    "renderMode": 2,
    "route": "/admin/accounts"
  },
  {
    "renderMode": 2,
    "route": "/admin/categories"
  },
  {
    "renderMode": 2,
    "route": "/admin/promotions"
  },
  {
    "renderMode": 2,
    "route": "/shop/profile"
  },
  {
    "renderMode": 2,
    "route": "/shop/articles"
  },
  {
    "renderMode": 2,
    "route": "/shop/inventory"
  },
  {
    "renderMode": 2,
    "route": "/shop/orders"
  },
  {
    "renderMode": 2,
    "route": "/client/home"
  },
  {
    "renderMode": 2,
    "route": "/client/search"
  },
  {
    "renderMode": 2,
    "route": "/client/shops"
  },
  {
    "renderMode": 0,
    "route": "/client/shop/*"
  },
  {
    "renderMode": 2,
    "route": "/client/cart"
  },
  {
    "renderMode": 2,
    "route": "/client/orders-history"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1581, hash: '6a2738f54b2c3119c109bdefbfd9eda191aea0df7cb6fce182ed353a640af67d', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1547, hash: '35bbbb6aadc22c63bb819a38fd0841613a71685138c0ed9342ebb3fc84fb1c73', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'admin/accounts/index.html': {size: 10024, hash: 'b497ed3659a6a3ebb4894ac5ef596edcddd726c27a4d969011bc1428a8d3737c', text: () => import('./assets-chunks/admin_accounts_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 78383, hash: 'ca6ccb98fd93e70339921a1ce54dd2b3184f709935f70ce7b0a503d251c0496f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 103134, hash: '5ed15ffd866c1cbb80af1ae3bb5ad12c88cd3d13b7a3cc690062dfe7c62acb67', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'client/search/index.html': {size: 10033, hash: '82049bc572d5955546d2880256f4e4fe9605e1937b3da7c716d8e87ba215a060', text: () => import('./assets-chunks/client_search_index_html.mjs').then(m => m.default)},
    'admin/shops/index.html': {size: 9930, hash: '544771dc854932f61b4043593beab098c183fa1c23e45d4123fde1adaab0fe7d', text: () => import('./assets-chunks/admin_shops_index_html.mjs').then(m => m.default)},
    'shop/articles/index.html': {size: 10024, hash: 'b497ed3659a6a3ebb4894ac5ef596edcddd726c27a4d969011bc1428a8d3737c', text: () => import('./assets-chunks/shop_articles_index_html.mjs').then(m => m.default)},
    'shop/orders/index.html': {size: 37334, hash: 'e6b0f25a9212cecbad6d65f4a21ad8b93639fddebc83e859e35cfdd9a86f56db', text: () => import('./assets-chunks/shop_orders_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 10027, hash: 'f64b994cb5c1bf7dfc6459b781e9ed125d0ced2270dd4ba3468a000d29560292', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'client/cart/index.html': {size: 5417, hash: 'bf0877193a5af984e0f8b0d5e7ead92e3ac137a117cc0d12590b9056d9d4b4d6', text: () => import('./assets-chunks/client_cart_index_html.mjs').then(m => m.default)},
    'admin/promotions/index.html': {size: 10033, hash: '04500f64e20658c82b9a2ff536d5fa30b8f4ea7add63bc3a1b6c0d569e96f483', text: () => import('./assets-chunks/admin_promotions_index_html.mjs').then(m => m.default)},
    'admin/dashboard/index.html': {size: 10024, hash: 'b497ed3659a6a3ebb4894ac5ef596edcddd726c27a4d969011bc1428a8d3737c', text: () => import('./assets-chunks/admin_dashboard_index_html.mjs').then(m => m.default)},
    'client/shops/index.html': {size: 6995, hash: 'c75e2b2fd5896e7d0281ef5d47b4b9e23d912fa5f833d4bdcf36e2830906bc16', text: () => import('./assets-chunks/client_shops_index_html.mjs').then(m => m.default)},
    'shop/inventory/index.html': {size: 31079, hash: 'eae6de0246f823701b66972dc2ad69cc02d08e60a72c7d564e4a4894bd5faa52', text: () => import('./assets-chunks/shop_inventory_index_html.mjs').then(m => m.default)},
    'shop/profile/index.html': {size: 10024, hash: 'b497ed3659a6a3ebb4894ac5ef596edcddd726c27a4d969011bc1428a8d3737c', text: () => import('./assets-chunks/shop_profile_index_html.mjs').then(m => m.default)},
    'articles/index.html': {size: 3735, hash: '9a319e8fe6efd687fbbb5bc1dfceb50c3192739547658083beb01f636accc768', text: () => import('./assets-chunks/articles_index_html.mjs').then(m => m.default)},
    'client/orders-history/index.html': {size: 4639, hash: '480b010d27bbd53d6920976f208451ba045075efc95bfeec53289776205c81a7', text: () => import('./assets-chunks/client_orders-history_index_html.mjs').then(m => m.default)},
    'admin/categories/index.html': {size: 10024, hash: 'b497ed3659a6a3ebb4894ac5ef596edcddd726c27a4d969011bc1428a8d3737c', text: () => import('./assets-chunks/admin_categories_index_html.mjs').then(m => m.default)},
    'client/home/index.html': {size: 10027, hash: 'f64b994cb5c1bf7dfc6459b781e9ed125d0ced2270dd4ba3468a000d29560292', text: () => import('./assets-chunks/client_home_index_html.mjs').then(m => m.default)},
    'styles-B672IDWP.css': {size: 703, hash: '7gvfBhLsr7Q', text: () => import('./assets-chunks/styles-B672IDWP_css.mjs').then(m => m.default)}
  },
};
