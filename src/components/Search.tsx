import { Component, FormEvent } from 'react';
import Card from './Card';

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type PropsType = {};
type StateType = {
  posts: Post[];
  limit: number;
  page: number;
  search: string;
};

export default class Search extends Component<PropsType, StateType> {
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
      limit: 5,
      page: 1,
      search: '',
    };
  }

  fetchData(page: number | null, limit: number | null, search: string | null) {
    let URL = `https://jsonplaceholder.typicode.com/posts`;
    let queryParams = '?';

    if (search !== null) {
      queryParams += `q=${search}&`;
    }

    if (page !== null) {
      queryParams += `_page=${page}&`;
    }

    if (limit !== null) {
      queryParams += `_limit=${limit}`;
    }

    fetch(`${URL}${queryParams}`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          posts: res,
        });
      });
  }

  componentWillMount() {
    this.fetchData(this.state.page, this.state.limit, null);

    const searchValue = localStorage.getItem('@search');
    if (searchValue !== null) {
      this.setState({
        ...this.state,
        search: searchValue,
      });
    }
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      search: event.currentTarget.value,
    });
  };

  handleSearch = () => {
    this.fetchData(this.state.page, this.state.limit, this.state.search.trim());
    localStorage.setItem('@search', this.state.search.trim());
  };

  render() {
    return (
      <div className="container">
        <div>
          <input
            type="text"
            placeholder="Searh"
            id="message"
            name="message"
            onChange={this.handleChange}
            value={this.state.search}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
        <div>
          <div className="content">
            {this.state.posts.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
          {this.state.posts.length === 0 && <p>No Results</p>}
        </div>
        <div>
          <button
            onClick={() => {
              this.fetchData(
                this.state.page - 1,
                this.state.limit,
                this.state.search
              );
              this.setState({
                ...this.state,
                page: this.state.page - 1,
              });
            }}
            disabled={this.state.page === 1}
          >
            Prev page
          </button>
          <button
            className="page-btn"
            onClick={() => {
              this.fetchData(
                this.state.page + 1,
                this.state.limit,
                this.state.search
              );
              this.setState({
                ...this.state,
                page: this.state.page + 1,
              });
            }}
          >
            Next page
          </button>
        </div>
      </div>
    );
  }
}
