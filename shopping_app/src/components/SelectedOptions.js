import { push } from "../router.js"
import { setItem, getItem } from "../storage.js"
import formatPrice from "../utils.js"

export default function SelectedOptions({ $target, initialState }) {
  const $component = document.createElement('div')
  $target.appendChild($component)

  this.state = initialState

  this.getTotalPrice = () => {
    const { product, selectedOptions } = this.state
    const { price: productPrice } = product
    return selectedOptions.reduce((acc, option) => acc + ((productPrice + option.optionPrice) * option.quantity), 0)
  }

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    const { product, selectedOptions = []} = this.state
    if (product && selectedOptions) {
      console.log(product, selectedOptions)
      console.log(selectedOptions.map(a=>a.optionName))
      $component.innerHTML = `
      <h3>선택된 상품</h3>
      <ul>
        ${selectedOptions.map(selectedOption => `
        <li>
          ${selectedOption.optionName} ${formatPrice(product.price + selectedOption.optionPrice)}원
          <input type="number" min="0" data-optionId="${selectedOption.optionId}" value="${selectedOption.quantity}" />
        </li>
        `).join('')}
      </ul>
      <div class="ProductDetail__totalPrice">${formatPrice(this.getTotalPrice())}원</div>
      <button class="OrderButton">주문하기</button>
      `
    }
  }

  this.render()

  $component.addEventListener('change', e => {
    if(e.target.tagName === "INPUT") {
      try {
        const nextQuantity = parseInt(e.target.value)
        const nextSelectedOptions = [...this.state.selectedOptions]

        if(typeof nextQuantity === "number") {
          const { product } = this.state
          const optionId = parseInt(e.target.dataset.optionid)
          const option = product.productOptions.find(option => option.id === optionId)
          const selectedOptionIndex = nextSelectedOptions.findIndex(selectedOption => selectedOption.optionId === optionId)
          nextSelectedOptions[selectedOptionIndex].quantity = option.stock >= nextQuantity ? nextQuantity : option.stock

          this.setState({
            ...this.state,
            selectedOption: nextSelectedOptions
          })
        }
      } catch(e) {
        console.log(e)
      }
    }
  })

  $component.addEventListener('click', (e) => {
    const { selectedOptions } = this.state
    if (e.target.className === 'OrderButton') {
      // 기존 장바구니 데이터가 있으므로 가져와보고 없으면 빈배열 처리
      const cartData = getItem('products_cart', [])
      // 장바구니 데이터 만들기
      setItem('products_cart', cartData.concat(selectedOptions.map(selectedOption => ({
        productId : selectedOption.productId,
        optionId : selectedOption.optionId,
        quantity : selectedOption.quantity,
      }))))
      push('/web/cart')
    }
  })
}