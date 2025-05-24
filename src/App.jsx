import * as React from "react";

// 10. Callback Handler in App component (moved up for reference)
// 6. React useState Hook for searchTerm
const App = () => {
  console.log('App renders');
  
  // 1. Move the list from global scope into App component
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

  // 6. Define React useState Hook for the searchTerm
  // 13. Lift state up from Search to App component
  const [searchTerm, setSearchTerm] = React.useState('');

  // 10. Define a callback Handler in the App component
  const handleSearch = (event) => {
    // 7. Update the searchTerm state inside the handler
    setSearchTerm(event.target.value);
  };

  // 14. Filter the stories with the stateful searchTerm
  // 15. Lower case the story's title and the searchTerm to make them equal
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
      {/* 11. Use callback handler from props in Search Component */}
      {/* 13. Pass searchTerm and handler as props */}
      <Search search={searchTerm} onSearch={handleSearch} />
      
      {/* 7. Show searchTerm in UI */}
      <p>Searching for <strong>{searchTerm}</strong>.</p>
      
      <hr />
      
      {/* 2. Use React props to pass the list of items to List component */}
      {/* 14. Pass filtered stories instead of all stories */}
      <List list={searchedStories} />
    </div>
  );
};

// 13. Updated Search component to use props instead of local state
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

// 3. Access list property from props object in List component
const List = ({ list }) => {
  console.log('List renders');
  
  return (
    <ul>
      {/* 4. Pass each item to Item component */}
      {list.map((item) => (
        <Item key={item.objectID} item={item} />
      ))}
    </ul>
  );
};

// 4. Item component extraction
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