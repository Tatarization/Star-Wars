import React, { useEffect, useState } from 'react';
import Input from '@mui/material/Input';
import { BasicTable } from './components/table/Table'
import { IUser } from './types/types'
import './App.css';
import { Header } from './components/header/Header';

function App() {
	const [data, setData] = useState<IUser[]>([]);
	const [page, setPage] = useState<number>(1);
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [fetching, setFetching] = useState<boolean>(true)

	const fetchData = async (page: number, search?: string) => {
		const url = search ? `https://swapi.dev/api/people/?search=${search}` : `https://swapi.dev/api/people/?page=${page}`
		const res = await fetch(url);
		const result = await res.json();
		search ? setData(result.results) : setData([...data, ...result.results]);
		setFetching(false)
		
	}
	const scrollHandler = (e: any) => {
		console.log(e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 50)
			if (e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 50) {
				setFetching(true)
			}
		}

	const filterSearch = (searchQuery: string) => {
		setSearchQuery(searchQuery)
		fetchData(page, searchQuery)
	}

	useEffect(() => {
		console.log(fetching)
		if (fetching && page < 10) {
			console.log(`fetching`)
			fetchData(page)
			setPage(page => page + 1)
		}
	}, [fetching])


	useEffect(() => {
		document.addEventListener('scroll', scrollHandler)
		return function () {
			document.removeEventListener('scroll', scrollHandler)
		}
	})

	return (
		<div className="App">
			<Header />
			<Input
				className="input"
				placeholder="Search by name"
				type="text"
				value={searchQuery}
				onChange={e => filterSearch(e.target.value)}
			/>
			<BasicTable data={data} />
		</div>
	);
}

export default App;
