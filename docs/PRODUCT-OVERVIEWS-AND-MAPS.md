# Product overview and delivery maps

Five showcased products have local overview links. Ceramic Tile Fix keeps its existing full detail page; the other four use a shared overview with uses, benefits, technical facts, document requests and related products. Mega-menu entries represent material families and have distinct family pages; their imagery is explicitly representative.

Product summaries were checked against current product information during implementation. No external manufacturer navigation is added to the UI. Product-family descriptions do not invent specifications.

DeliveryMap is used on Home, About and Contact. Maps support pan and zoom; address searches explore locations without asserting service availability. Configure confirmed delivery areas, office and warehouse addresses in lib/delivery-locations.ts. Empty configuration displays an honest pending-coverage message and an interactive world map. Exact service areas cannot be shown until the business supplies them. Embedded maps require network access to OpenStreetMap or Google Maps.
