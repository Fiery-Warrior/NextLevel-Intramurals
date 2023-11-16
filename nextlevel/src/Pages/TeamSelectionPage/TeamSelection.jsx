import React, { useState } from 'react';
import './TeamSelection.css';

const TeamItem = ({ team, index, handleAddItemClick, addedItem }) => {
  return (
    <div className="search_item">
      {team}
      <button className="add_button" onClick={() => handleAddItemClick(index)}>
        +
      </button>
    </div>
  );
};

const Elevation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItem, setAddedItem] = useState([]); 

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddItemClick = (itemIndex) => {
  
    const newContent = `Test ${new Date().toLocaleTimeString()}`;
    
    // Perform actions related to the item here

    setAddedItem((prevContent) => [...prevContent, newContent]);
  };

  const items = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => `Team ${elevation}`);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="title">Team List</h1>
        <input
          className="search_input"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a team..."
        />
      </div>
      {searchQuery.length > 0 && (
        <div className="search_list">
          {filteredItems.map((team, index) => (
            <TeamItem
              key={index}
              team={team}
              index={index}
              handleAddItemClick={handleAddItemClick}
              addedItem={addedItem}
            />
          ))}
          {filteredItems.length === 0 && <p>No matching teams found.</p>}
        </div>
      )}
      <div className="added_items">
        {addedItem.map((content, index) => (
          <p key={index}>{content}</p>
        ))}
    </div>
    </div>
  );
};

export default Elevation;






