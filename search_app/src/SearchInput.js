export default function SearchInput({ $target, onKeyup}) {
  const $SearchInput = document.createElement('form')
  $SearchInput.className = "SearchInput"
  $target.appendChild($SearchInput)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    $SearchInput.innerHTML = `
      <input class="SearchInput__input" type="text" placeholder="프로그램 언어를 입력하세요." value="">
      <input type="text" style="display:none;"/>
    `
  }

  $SearchInput.addEventListener("keyup", (e) =>{
    const value = e.target.value
    if(value) {
      if(e.key !=="Enter" && !e.key.includes("Arrow")) {
      onKeyup(e.target.value)
    }
  }})

  this.render()
}
