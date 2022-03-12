export default function Loading({ $target}) {
  const $Loading = document.createElement('div')
  $target.appendChild($Loading);
  
  this.state = false

  this.setState = (nextState) => {
    if(this.state !== nextState){
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    $Loading.innerHTML = `
    <div class="Modal Loading">
      <div class="content">
        <img src="./assets/nyan-cat.gif">
      </div>
    </div>
    `
   $Loading.style.display = this.state ? 'block' : 'none'
  }

  this.render()
};
