import React from 'react';
import Autocomplete from './Autocomplete';

export default class GithubIssueSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: null }
  }
  
  getGithubIssues = async (query) => {
    if (query.length < 3) {
      return;
    }

    let encodedQuery = (`q=${encodeURIComponent(query)} repo:facebook/react type:issue state:open`);
    let response = await fetch(`https://api.github.com/search/issues?${encodedQuery}&per_page=10`, {
      headers: {
        "Authorization": `token 8800a71721f051e1fa2e6e646929a4a9c7727b8d`
      }
    });
    
    if (response.status === 200) {
      let results = await response.json()
      let mappedResults = results.items.map((r) => {
        return {
          labels: r.labels,
          title: r.title,
          url: r.html_url
        }
      });
      return mappedResults;
    } else {
      throw (new Error(response.statusText));
    }
  }

  onSelect = (selected) => {
    this.setState({selected: selected })
  }

  render() { 
    return <div>
      <div className="columns">
        <div className="column is-half">
          <Autocomplete getResults={this.getGithubIssues} onSelect={this.onSelect} />
        </div>
      </div>

      <div className="columns">
        {this.state.selected && <div className="card">
          <div className="card-content">
            <a className="title is-5" href={this.state.selected.url}>{this.state.selected.title}</a>
            <div className="content has-text-left">
              <p> {this.state.selected.labels.map((l) => {
                return <span className="tag is-rounded" key={l.id}>{l.name}</span>
              })}
              </p>
            </div>
          </div>
        </div>}
      </div>
    </div>;
  }
}

