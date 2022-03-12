import { push } from "../router.js"
import { removeItem } from "../storage.js"
import formatPrice from "../utils.js"

export default function Cart({$target, initialState}) {
  const $component = document.createElement("div")
  $component.className = "Cart"

  this.state = initialState

  $target.appendChild($component)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.getTotalPrice = () => {
    return this.state.reduce(
      (acc, option) => acc + ((option.productPrice + option.optionPrice) * option.quantity), 0)
  }

  this.render = () => {
    $component.innerHTML = `
    <ul>
      ${this.state.map(cartItem => `
      <li class="Cart__item">
        <img src="${cartItem.imageUrl}">
        <div class="Cart__itemDescription">
          <div>${cartItem.productName} ${cartItem.optionName} ${cartItem.quantity}개</div>
          <div>${formatPrice(cartItem.productPrice + cartItem.optionPrice)}원</div>
        </div>
      </li>
      `).join('')}
    </ul>
    <div class="Cart__totalPrice">
      총 상품가격 ${formatPrice(this.getTotalPrice())}원
    </div>
    <button class="OrderButton">주문하기</button>
    `
    return $component
  }

  this.render()

  $component.addEventListener('click', e => {
    if(e.target.className === "OrderButton") {
      alert('주문 되었습니다!')
      removeItem('products_cart')
      push('/web/')
    }
  })
}