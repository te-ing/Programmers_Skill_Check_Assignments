import { push } from "../router.js"
import formatPrice from "../utils.js"

export default function ProductList({ $target, initialState }) {
  const $productList = document.createElement('ul')
  $target.appendChild($productList)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if(!this.state) return
    $productList.innerHTML = `
    ${this.state.map(({id, imageUrl, name, price})=>`
      <li class="Product" data-id=${id}>
        <img src="${imageUrl}">
        <div class="Product__info">
          <div>${name}</div>
          <div>${formatPrice(price)}원~</div>
        </div>
    </li>
    `).join('')}
    `
  }
  
  $productList.addEventListener("click", (e) => {
    const $product = e.target.closest('.Product')
    const product = $product?.dataset
    if(product) {
      push(`products${product.id}`)
    }
  })

}