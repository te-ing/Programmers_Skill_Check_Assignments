import { request } from "../api.js";
import ProductList from "../components/ProductList.js";

export default function ProductListPage({$target}) {
    const $page = document.createElement("div");
    $page.className = "ProductListPage"

    $page.innerHTML = "<h1>상품 목록</h1>";
  
    this.render = () => {
      $target.appendChild($page);
    };
  
    this.setState = (nextState) => {
      this.state = nextState;
      productList.setState(this.state);
    };
  
    const fetchProducts = async () => {
      const products = await request();
      this.setState(products);
    };
  
    const productList = new ProductList({
      $target: $page,
      initialState: this.state,
    });
  
    fetchProducts();
  }