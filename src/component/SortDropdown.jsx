import React from 'react';

export default function SortDropdown({ onSortChange }) {
    return (
        <div className="sort-dropdown">
            <div className='md:inline hidden'>
                <label htmlFor="sort" className="text-[#A6B1E1] p-2 md:text-xl">
                    Sort tasks:
                </label>
            </div>
        
        <select
            id="sort"
            className="text-[#424874] bg-[#A6B1E1] p-2 m-1 rounded md:font-bold"
            onChange={(e) => onSortChange(e.target.value)}
        >
            <option value="incomplete">Incomplete tasks first</option>
            <option value="newest">Newest task first</option>
            <option value="oldest">Oldest task first</option>
            <option value="complete">Complete tasks first</option>
        </select>
        </div>
    );
}
