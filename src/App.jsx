import * as React from "react";

// 1. Define API endpoint as global variable
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  console.log('App renders');
  
  // Remove initialStories as we'll fetch from API
  const initialStories = [
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

  // Use stored value from localStorage to set initial state
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem('search') || 'React'
  );

  // useState hook using initialStories as initial state
  const [stories, setStories] = React.useState([]);

  // 9. Loading indicator state
  const [isLoading, setIsLoading] = React.useState(false);

  // 11. Error handling state
  const [isError, setIsError] = React.useState(false);

  // 16. Add new state to manage URL
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  // useEffect Hook to save searchTerm to localStorage
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // 2-5, 9, 11, 17. useEffect for fetching external data
  React.useEffect(() => {
    // Reset error state
    setIsError(false);
    // 9. Set loading to true before fetching
    setIsLoading(true);
    
    // 3-5. Fetch data from API
    fetch(url)
      .then((response) => response.json()) // 4. Parse JSON response
      .then((result) => {
        // 5. Update stories state with API data
        setStories(result.hits);
        // 9. Set loading to false when data received
        setIsLoading(false);
      })
      .catch(() => {
        // 11. Handle error - set error to true and loading to false
        setIsError(true);
        setIsLoading(false);
      });
  }, [url]); // 17. Change dependency to url instead of searchTerm

  // Generic callback handler for input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // 16. Button handler to set URL from current searchTerm
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  // Event handler which removes an item from the list
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
      {/* Generalized Search component with dynamic props */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        type="text"
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      {/* 15. Add button for confirmation */}
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </button>
      
      {/* Show current search term in UI */}
      <p>Searching for <strong>{searchTerm}</strong>.</p>
      
      <hr />
      
      {/* 12. Error handling with logical AND operator */}
      {isError && <p>Something went wrong ...</p>}
      
      {/* 10. Conditional rendering for loading indicator */}
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        /* 6. Pass only regular stories (no more searchedStories) */
        <List list={stories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

// Generalized component with dynamic id, label, and generic naming
const InputWithLabel = ({ id, value, type = 'text', onInputChange, children }) => {
  console.log('InputWithLabel renders');
  
  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <input 
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </div>
  );
};

// Pass callback handler to Item component as prop
const List = ({ list, onRemoveItem }) => {
  console.log('List renders');
  
  return (
    <ul>
      {list.map((item) => (
        <Item 
          key={item.objectID} 
          item={item} 
          onRemoveItem={onRemoveItem}
        />
      ))}
    </ul>
  );
};

// Add delete button with inline handler
const Item = ({ item, onRemoveItem }) => {
  console.log('Item renders');
  
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        {/* Inline handler for onClick event using callback handler */}
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default App;