export default function Breadcrumb({ $target, initialState, onClick }) {
  const $Breadcrumb = document.createElement('nav')
  $Breadcrumb.className = "Breadcrumb"
  $target.appendChild($Breadcrumb);

  this.state = initialState

  this.setState = (nextState) => {
    if(this.state !== nextState){
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    $Breadcrumb.innerHTML = `
    <div class="breadcrumbItem">root</div>
    ${this.state.paths?.map(({id, name}) => `<div class="breadcrumbItem" data-id=${id}>${name}</div>` ).join('')}
    `
  }
  this.render()

  $Breadcrumb.addEventListener('click', (e)=>{
    if(this.state.paths.length !== 0 && e.target.innerText !== this.state.paths[this.state.paths.length-1].name) {
      const $BreadcrumbItem = e.target.closest('.breadcrumbItem')
      const { id } = $BreadcrumbItem.dataset
      onClick(id)
    }
  })
};
