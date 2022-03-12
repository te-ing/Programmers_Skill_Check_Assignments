import CartPage from "./pages/CartPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import ProductListPage from "./pages/ProductListPage.js";
import { initRouter } from "./router.js";

export default function App({ $target }) {
  this.route = () => {
    const { pathname } = location;
    $target.innerHTML= ''
    if (pathname === "/web/") {
      new ProductListPage({ $target }).render()
    } else if (pathname.slice(5,13) === "products") {
      const productId = pathname.slice(13)
      new ProductDetailPage({ 
        $target,
        productId
       }).render()
    } else if (pathname === "/web/cart") {
      new CartPage({ $target }).render()
    }
  };

  initRouter(this.route)
  window.addEventListener('popstate', this.route)
  this.route();
}
