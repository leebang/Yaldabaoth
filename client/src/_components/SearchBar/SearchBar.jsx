import _ from 'lodash';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

class SearchBar extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
      this.resetComponent()
    }
  
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
  
    handleResultSelect = (e, { result }) => {
      this.setState({ value: result.title });
      this.props.onSearchSelect(result.title);
    }
  
    handleSearchChange = (e, { value }) => {
      this.setState({ isLoading: true, value })
  
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()
  
        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => re.test(result.title)
  
        this.setState({
          isLoading: false,
          results: _.filter(this.props.source, isMatch),
        })
      }, 300)
    }
  
    render() {
      const { isLoading, value, results } = this.state
      return (
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={results}
              value={value}
              {...this.props}
            />
      )
    }
  }

  export { SearchBar as SearchBar }; 