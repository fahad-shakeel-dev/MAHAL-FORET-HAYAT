# Interactive product catalog

/products uses one sidebar-and-grid catalog. Published products come from lib/products.ts. Sidebar families come from lib/product-navigation.ts; productTypes in components/ProductCatalog.tsx maps the five current products to their correct subcategories.

Search, family/subcategory checkboxes, removable filter chips, sorting and pagination operate on published products. Zero-count subcategories provide an explicit empty state, an inquiry action and a local material-family overview where one exists. They never fabricate individual products.

Product image/title/overview links open the individual product route. TDS and quote requests open an accessible native dialog with a product-prefilled inquiry form. TDS remains a request because no current downloadable TDS files have been supplied. The portfolio PDF remains a local download.

Company wording follows the independent MAHAL FORET HAYAT showcase direction, without authorized-distributor claims.
