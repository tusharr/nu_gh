import React from 'react';
import Autocomplete from './Autocomplete';

export default class GithubIssueSearch extends React.Component {
  getGithubIssues = async (query) => {
    if (query.length < 3) {
      return;
    }

    let encodedQuery = (`q=${encodeURIComponent(query)} repo:facebook/react type:issue state:open`);
    let response = await fetch(`https://api.github.com/search/issues?${encodedQuery}`, {
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
          url: r.url
        }
      });
      console.debug(mappedResults);
      return mappedResults;
    } else {
      console.error(response.statusText);
    }
  }

  onSelect = (selected) => {

  }

  render() { 
    return <div>
      <div className="columns">
        <div className="column is-half">
          <Autocomplete getResults={this.getGithubIssues} onSelect={this.onSelect} />
        </div>
        
      </div>
      
    </div>;
  }
}

