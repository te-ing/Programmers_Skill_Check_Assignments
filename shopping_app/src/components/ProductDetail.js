import formatPrice from "../utils.js"
import SelectedOptions from "./SelectedOptions.js"

export default function ProductDetail({ $target, initialState }) {
  let isInitialized = false

  const $productDetail = document.createElement('div')
  $productDetail.className = "ProductDetail"
  $target.appendChild($productDetail)

  this.state = initialState
  let selectedOptions = null

  this.setState = nextState => {
    this.state = nextState
    this.render()

    
    if(selectedOptions) {
      selectedOptions.setState({
        product: this.state.product,
        selectedOptions: this.state.selectedOptions
      })
    }
  }

  this.render = () => {
    const { product } = this.state
    if(!isInitialized) {
    $productDetail.innerHTML = `
    <img src="${product.imageUrl}" height="400">
    <div class="ProductDetail__info">
      <h2>${product.name}</h2>
      <div class="ProductDetail__price">${formatPrice(product.price)}원~</div>
      <select class="ProductDetail__select">
      <option>선택하세요.</option>
      ${product.productOptions?.map(option => `
        <option value="${option.id}" ${option.stock === 0 ? "disabled" : ""}>
        ${option.stock === 0 ? "(품절)" : ""}${product.name} ${option.name} ${option.price ? `+${formatPrice(option.price)}원` : ""}</option> 
      `)}
      </select>
      <div class="ProductDetail__selectedOptions">
      </div>
    </div>
    `

    selectedOptions = new SelectedOptions({
      $target: $productDetail.querySelector(".ProductDetail__selectedOptions"),
      initialState: {
        product: this.state.product,
        selectedOptions: this.state.selectedOptions
      }
    })
    isInitialized = true
  }}
  
  $productDetail.addEventListener("change", (e) => {
    if(e.target.tagName === "SELECT") {
      const selectedOptionId = parseInt(e.target.value)
      const { product, selectedOptions } = this.state
      const option = product.productOptions.find(option => option.id === selectedOptionId)
      const selectedOption = selectedOptions.find(selectedOption => selectedOption.optionId === selectedOptionId)
      
      if(option && !selectedOption) {
        const nextSelectedOptions = [
          ...selectedOptions,
          {
            productId: product.id,
            optionId: option.id,
            optionName: option.name,
            optionPrice: option.price,
            quantity: 1
          }
        ]
        this.setState({
          ...this.state,
          selectedOptions: nextSelectedOptions
        })
      }
    }
  })
  
  this.render()
}
