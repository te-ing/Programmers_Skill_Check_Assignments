export default function SelectedLanguage({ $target, onClick }) {
  const $SelectedLanguage = document.createElement('div')
  $SelectedLanguage.className = "SelectedLanguage"
  $target.appendChild($SelectedLanguage)

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }
  
  this.render = () => {
    if(!this.state) return
    $SelectedLanguage.innerHTML = `
    <ul>
    ${this.state.resentSearch?.map(word => `<li>${word}</li>`).join(' ')}
    </ul>
    `
  }

  $SelectedLanguage.addEventListener('click', (e) => {
    onClick(e.target.innerHTML)
  })

  this.render()
}
