import { request } from "./api.js"
import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js"
import ImageViewer from "./ImageViewer.js"
import { IMAGE_BASE_LINK } from "./constant.js"
import Loading from "./Loading.js"

export default function App({ $target }) {

	this.state = {
		isRoot: true,
		isLoading: false,
		nodes: [],
		paths: [],
		image: null,
	}

  const breadcrumb = new Breadcrumb({ 
    $target,
		initialState: this.state.paths,
    onClick: async (id) => {
      if(id) {
        const nextPaths = [...this.state.paths]
        const pathIndex = nextPaths.findIndex(path => path.id === id)
        this.setState({
          ...this.state,
          paths: nextPaths.slice(0, pathIndex + 1)
        })
      } else {
        this.setState({
          ...this.state,
          paths: []
        })
      }     
			await fetchNodes(id)
		}
  })
	
	const nodes = new Nodes({
		$target,
		initialState: {
			nodes: this.state.nodes,
			paths: this.state.paths,
      image: this.state.image,
		},
		onClick: (node) =>{
			const {paths} = this.state;	
			if(node.type === "DIRECTORY") {
				this.state.paths.push(node)
				fetchNodes(paths[paths.length-1].id)
        this.setState({
					...this.state,
					paths: paths
				})
			} else if(node.type === "PREV") {
				this.state.paths.pop()
				paths[paths.length-1] ? fetchNodes(paths[paths.length-1].id) : fetchNodes()
        this.setState({
					...this.state,
					paths: paths
				})
			} else if (node.type === "FILE"){
				this.setState({
					...this.state,
					image: `${IMAGE_BASE_LINK}${node.path}`
				})
			}
		},
	})

	const imageViewer = new ImageViewer({
		$target,
		initialState: {image: this.state.image},
    onClose: () => {
      this.setState({
        ...this.state,
        image: null
      })
    }
	})

	const loading = new Loading({
		$target
	})

	this.setState = nextState => {
    this.state = nextState

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
      paths: this.state.paths,
    })

    breadcrumb.setState({
      paths: this.state.paths,
    })

    imageViewer.setState({
      image: this.state.image
    })

		loading.setState(this.state.isLoading)
  }

	const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    })
		
		const nodes = await request(id ? `/${id}` : `/`);

		this.setState({
			...this.state,
			isRoot: id ? false : true,
			nodes,
			isLoading: false
		})
	}

	fetchNodes()
}
