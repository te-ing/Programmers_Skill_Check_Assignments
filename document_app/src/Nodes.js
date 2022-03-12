export default function Nodes({ $target, initialState, onClick }) {
  const $Nodes = document.createElement('div')
  $Nodes.className = "Nodes"
  $target.appendChild($Nodes);

  this.state = initialState;

  this.setState = (nextState) => {
    if(this.state !== nextState){
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    const { isRoot, nodes } = this.state
    $Nodes.innerHTML = `
    ${isRoot ? "" : 
    `<div class="Node" data-type="PREV">
      <img src="./assets/prev.png">
    </div>`}
    ${nodes.map(node=> `
      <div class="Node" data-id=${node.id} data-type=${node.type} data-path=${node.filePath} data-name=${node.name}>
        ${node.type === "DIRECTORY" ? "<img src='./assets/directory.png' />" : "<img src='./assets/file.png' />" }
        <div>${node.name}</div>
      </div>
    `).join('')}
    `
  }

  $Nodes.addEventListener("click", (e) => {
    const $node = e.target.closest('.Node')
    const node = $node?.dataset
    if(node) onClick(node);
  })

};

