import { request } from "./api.js"
import debounce from "./debounce.js"
import SearchInput from "./SearchInput.js"
import SelectedLanguage from "./SelectedLanguage.js"
import Suggestion from "./Suggestion.js"

export default function App({ $target }) {
	this.state = {
		search: [],
    resentSearch: [],
    keyword: "",
	}

  const selectedLanguage = new SelectedLanguage({
    $target,
    resentSearch: this.state.resentSearch,
    onClick: (clickWord) => {
      alert(clickWord)
    }
  })

  const searchInput = new SearchInput({
    $target,
		initialState: this.state.search,
    onKeyup: debounce((keyword) => {
      if(keyword) fetchSearch(keyword)
    }, 1000)
  })

  const suggestion = new Suggestion({
    $target,
    search: this.state.search,
    onClick: (clickWord) => {
      alert(clickWord)
      const resentSearch = !this.state.resentSearch.includes(clickWord) ? 
      [clickWord, ...this.state.resentSearch] : this.state.resentSearch
      if(resentSearch.length>5){
        resentSearch.pop()
      }
      this.setState({
        ...this.state,
        resentSearch,
      })
    }
  })
  
	this.setState = nextState => {
    this.state = nextState

    selectedLanguage.setState({
      resentSearch: this.state.resentSearch
    })

    suggestion.setState({
      search: this.state.search,
      keyword: this.state.keyword
    })
  }

  const fetchSearch = async (keyword) => {
    this.setState({
      ...this.state,
    })
		
		const search = await request(keyword)

    if(search.length){
      this.setState({
        ...this.state,
        search,
        keyword,
      })
    }
	}
}
