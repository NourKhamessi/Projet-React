import * as React from "react";

const App = () => {
  console.log('App renders');
  
  // Move stories to App component
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  // 7. Use stored value from localStorage to set initial state
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || ''
  );

  // 8. Use React's useEffect Hook to trigger side-effect when searchTerm changes
  React.useEffect(() => {
    // 6. Store searchTerm in localStorage whenever it changes
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // Callback handler in App component
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter stories with searchTerm (case-insensitive)
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
      {/* 1. Provide Search component with current state of searchTerm */}
      <Search search={searchTerm} onSearch={handleSearch} />
      
      {/* Show current search term in UI */}
      <p>Searching for <strong>{searchTerm}</strong>.</p>
      
      <hr />
      
      {/* Pass filtered stories to List component */}
      <List list={searchedStories} />
    </div>
  );
};

// 3. Refactor Search component with props destructuring
const Search = ({ search, onSearch }) => {
  console.log('Search renders');
  
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input 
        id="search" 
        type="text" 
        value={search}
        onChange={onSearch}
      />
    </div>
  );
};

// 4. Refactor List component with props destructuring
const List = ({ list }) => {
  console.log('List renders');
  
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

// 4. Refactor Item component with props destructuring
const Item = ({ item }) => {
  console.log('Item renders');
  
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
    </li>
  );
};

export default App;