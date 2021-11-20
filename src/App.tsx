import React, { useEffect, useState } from 'react';
import { Character } from './types/types'
import { BasicTable } from './components/table/Table'
import { Header } from './components/header/Header';
import Pagination from '@mui/material/Pagination';
import Input from '@mui/material/Input';
import './App.css';

function App() {
	const [data, setData] = useState<Character[]>([]);
	const [totalPageCount, setTotalPageCount] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	
	const fetchData = async (page: number, search?: string) => {
		const url = search ? `https://swapi.dev/api/people/?search=${search}&page=${page}` : `https://swapi.dev/api/people/?page=${page}`
		const res = await fetch(url);
		const result = await res.json();
		setTotalPageCount(result.count);
		setData(result.results);
	}

	const filterSearch = (page: number, searchQuery: string) => {
		setSearchQuery(searchQuery)
		fetchData(page, searchQuery)
	}

	useEffect(() => {
		fetchData(1);
	  }, []);
	
	return (
		<div className="App">
			<Header />
			<Input
				className="input"
				placeholder="Search by name"
				type="text"
				value={searchQuery}
				onChange={e => filterSearch(1, e.target.value)}
			/>
			{data.length === 0 ? <h1>Not found</h1> : <BasicTable data={data} /> }
			
			<Pagination 
				count={Math.ceil(totalPageCount / 10)} 
				color="secondary" 
				onChange={
					(e, page) => {
						filterSearch(page, searchQuery)
					}
				}
			/>
		</div>
	);
}

export default App;
