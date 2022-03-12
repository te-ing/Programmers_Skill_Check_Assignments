export default function Suggestion({ $target, onClick }) {
  const $Suggestion = document.createElement('div')
  $target.appendChild($Suggestion)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.render = () => {
    if(!this.state) return
    if(this.state.search.length)$Suggestion.className = "Suggestion"
    const {search, keyword} = this.state
    $Suggestion.innerHTML = `
    <ul>
    ${search.map((search, index) =>`
      <li class="Suggestion__item" tabindex="${index}">${search}</li>
    `).join('')}
    </ul>
    `
    $target.addEventListener("keyup", (e) => {
      if(e.key.substring(0,5) !== "Arrow") return
      console.log(this.state.search[0])
      
      console.log(e.key)
    })
  }
  
  $Suggestion.addEventListener("click",(e) =>{
    if(e.target.innerHTML) onClick(e.target.innerHTML)
  })
 
  this.render()
}
