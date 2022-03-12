export default function ImageViewer({ $target, onClose}) {
  const $imageViewer = document.createElement('div')
  $imageViewer.classList = "Modal ImageViewer"
  $target.appendChild($imageViewer);
  
  this.state = {
    image: null
  }

  this.setState = (nextState) => {
    if(this.state !== nextState){
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    $imageViewer.style.display = this.state.image ? 'block' : 'none'
    $imageViewer.innerHTML = `
     <div class="content">
      <img src="${this.state.image}" />
     </div>
   `
  }

  this.render()

  window.addEventListener('keyup', (e) => {
    if(e.key === "Escape") {
      onClose()
    }
  })

  $imageViewer.addEventListener('click', (e)=>{
    if(Array.from(e.target.classList).includes('Modal')) {
      onClose()
    }
  })


};
