import * as React from "react";

const App = () => {
  console.log('App renders');
  
  // 7. Rename variable "stories" to "initialStories"
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
    localStorage.getItem('search') || ''
  );

  // 8. Define useState hook using initialStories as initial state
  const [stories, setStories] = React.useState(initialStories);

  // useEffect Hook to trigger side-effect when searchTerm changes
  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  // Generic callback handler for input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // 9. Event handler which removes an item from the list
  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };

  // Filter stories with searchTerm (case-insensitive)
  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      
      {/* 1. Generalized Search component with dynamic props */}
      {/* 3. Component composition with opening and closing tags */}
      {/* 5. Render <strong>Search:</strong> within InputWithLabel */}
      <InputWithLabel
        id="search"
        value={searchTerm}
        type="text"
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      
      {/* Show current search term in UI */}
      <p>Searching for <strong>{searchTerm}</strong>.</p>
      
      <hr />
      
      {/* 9. Pass callback handler to List component */}
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
    </div>
  );
};

// 1. Generalized component with dynamic id, label, and generic naming
// 2. Add "type" attribute to InputWithLabel component
// 4. Use children prop instead of label prop
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

// 10. Pass callback handler to Item component as prop
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

// 11. Add delete button with inline handler
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
        {/* 11. Inline handler for onClick event using callback handler */}
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default App;