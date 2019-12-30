import React from "react";
import { withApollo, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

const FEED_SEARCH_QUERY = gql`
  query FeedSearchQuery($filter: String!) {
    searchProducts(filter: $filter) {
      _id
      name
    }
  }
`;

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filter: "",
      empty: true,
      voice: false,
      started: false, 
      voiceSearch: ""
    }

    window.SpeechRecognition = window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    this.recognition = new window.SpeechRecognition();

    this.recognition.addEventListener('result', e => {
      this.setState({ voice: true, voiceSearch: e.results[0][0].transcript });
    })
  }

  _executeSearch = async (val, client) => {
    this.setState({ voice: false, voiceSearch: "", filter: val });
    if (val.length === 0) {
      this.setState({ empty: true, products: [] })
      return null;
    } else {
      this.setState({ empty: false });
      const data = await client.query({ query: FEED_SEARCH_QUERY, variables: { filter: val } });
      this.setState({ products: data.data.searchProducts.map(product => {
        return product
      }) });
    }
    // console.log(this.state.products);
    // return data;
  }

  getProducts(client) {
    if (this.state.products.length > 0) {
      return this.state.products.map(product => {
        return (
          <Link key={product._id} to={`/products/${product._id}`} onClick={() => this._executeSearch("", client)}><li className="results">
            <p>{product.name}</p>
          </li></Link>
        )
      })
    } else if (this.state.empty !== true) {
      return <p className="results">No products found</p>
    }
  }

  voiceSearch = () => {
    if (this.state.started) return;
    this.setState({ started: true });
    this.recognition.start();
  }

  render() {
    return (
      <ApolloConsumer>
        {(client) => {
          if (this.state.voice) {
            this.setState({ voice: false, voiceSearch: "", started: false })
            this._executeSearch(this.state.voiceSearch, client)
          }
          return <div className="outer-search-div">
            <div className="nav-search-div">
              <input id="search" className="nav-search" type="search" onChange={e => this._executeSearch(e.target.value, client)} placeholder="Search for planets, stars, etc.." />
              <button className="search-btn" onClick={this.voiceSearch}><img className="search-img" src="https://img.icons8.com/ios-filled/50/000000/search.png" alt=""/></button>
            </div>
            <div>
              <ul className="results-ul">
                {this.getProducts(client)}
              </ul>
            </div>
          </div>
        }}
      </ApolloConsumer>
    )
  }
}

export default withApollo(Search);