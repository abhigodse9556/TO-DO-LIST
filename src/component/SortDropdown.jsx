import React from 'react';

export default function SortDropdown({ onSortChange }) {
    return (
        <div className="sort-dropdown">
        <label htmlFor="sort" className="text-[#A6B1E1] p-2 text-xl">
            Sort tasks:
        </label>
        <select
            id="sort"
            className="text-[#424874] bg-[#A6B1E1] p-2 rounded m-5 md:font-bold"
            onChange={(e) => onSortChange(e.target.value)}
        >
            <option value="newest">Newest task first</option>
            <option value="oldest">Oldest task first</option>
            <option value="incomplete">Incomplete tasks first</option>
            <option value="complete">Complete tasks first</option>
        </select>
        </div>
    );
}
