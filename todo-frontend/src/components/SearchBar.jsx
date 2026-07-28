import { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Search } = Input;

function SearchBar({ onSearch }) {
  const [search, setSearch] = useState("");

  function handleSearch(value) {
    onSearch(value.trim());
  }

  return (
    <div className="mb-6">
      <Search
        placeholder="Search todos..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />
    </div>
  );
}

export default SearchBar;