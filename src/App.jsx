import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const DEFAULT_ITEMS_PER_PAGE = 5;
	const BASE_URL = 'https://api.punkapi.com';

	const [beers, setBeers] = useState([]);
	const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

	const url = new URL('/v2/beers?', BASE_URL);

	const fetchUserData = async (page, itemsPerPage) => {
		// Query parameters
		const urlSearchParams = new URLSearchParams({
			page,
			per_page: itemsPerPage,
		});

		// Fetch call
		const response = await fetch(url + urlSearchParams);
		setBeers(await response.json());
	};

  const modifyItemsPerPage =  (e) => {
    setItemsPerPage(Number(e.target.value))
  }

	useEffect(() => {
		fetchUserData(page, itemsPerPage);
	}, [page, itemsPerPage]);

	const isDisabled = (buttonType, page) => {
		if (buttonType === 'next') {
			return page <= 1;
		}

		if (buttonType === 'last') {
			return page >= 10;
		}
	};

	return (
		<div className="App">
			<h1>Beers List</h1>
			<table>
				<thead>
					<tr className="table">
						<td>id</td>
						<td>Name</td>
						<td>Description</td>
					</tr>
				</thead>
				<tbody>
					{beers ? (
						beers.map((beer) => {
							{
								return (
									<tr key={beer.id} className="table">
										<td>{beer.id}</td>
										<td>{beer.name}</td>
										<td>{beer.tagline}</td>
									</tr>
								);
							}
						})
					) : (
						<h1>Loading</h1>
					)}
				</tbody>
			</table>
			<div className="buttons__wrapper">
				<button disabled={isDisabled('next', page)} onClick={() => setPage(1)}>
					First
				</button>
				<button
					disabled={isDisabled('next', page)}
					onClick={() => page > 1 && setPage(page - 1)}
				>
					Back
				</button>
				<p>{page}</p>
				<button
					disabled={isDisabled('last', page)}
					onClick={() => page < 10 && setPage(page + 1)}
				>
					Next{' '}
				</button>
				<button disabled={isDisabled('last', page)} onClick={() => setPage(10)}>
					Last
				</button>
        <div className="select__wrapper">
        <label htmlFor="id_select"> Results per page </label>
          <select id="id_select" autoFocus={true} value={itemsPerPage} onChange={modifyItemsPerPage}>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
        </div>
        
			</div>
		</div>
	);
}

export default App;
