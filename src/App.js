import React, { useState, useEffect } from 'react';
import './App.css';
import MaterialTable from 'material-table';

function App() {
	const url = 'http://localhost:4000/projectRooms';
	const [data, setData] = useState([]);
	useEffect(() => {
		getProjectRooms();
	}, []);

	const getProjectRooms = () => {
		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => setData(resp));
	};
	const columns = [
		{
			title: 'Formula',
			field: 'Formula',
			lookup: { 1: 'Döşeme Alanı', 2: 'Mahal Çevresi' },
			validate: (rowData) =>
				rowData.Formula === undefined || rowData.Formula === ''
					? 'Required'
					: true,
		},
		{
			title: 'ID',
			field: 'id',
			editable: false,
			validate: (rowData) =>
				rowData.name === undefined || rowData.name === '' ? 'Required' : true,
		},
		{
			title: 'Kat Adı',
			field: 'FloorName',
			validate: (rowData) =>
				rowData.FloorName === undefined || rowData.FloorName === ''
					? 'Required'
					: true,
		},

		{
			title: 'Bina Adı',
			field: 'BuildingName',
			validate: (rowData) =>
				rowData.BuildingName === undefined || rowData.BuildingName === ''
					? 'Required'
					: true,
		},
		{
			title: 'Oda No',
			field: 'RoomCode',
			validate: (rowData) =>
				rowData.RoomCode === undefined || rowData.RoomCode === ''
					? 'Required'
					: true,
		},
		{
			title: 'Oda Adı',
			field: 'RoomName',
			validate: (rowData) =>
				rowData.RoomName === undefined || rowData.RoomName === ''
					? 'Required'
					: true,
		},
		{
			title: 'Oda Alanı',
			field: 'RoomArea',
			validate: (rowData) =>
				rowData.RoomArea === undefined || rowData.RoomArea === ''
					? 'Required'
					: true,
		},
		{
			title: 'Oda Çevrei',
			field: 'RoomPerimeter',
			validate: (rowData) =>
				rowData.RoomPerimeter === undefined || rowData.RoomPerimeter === ''
					? 'Required'
					: true,
		},
		{
			title: 'Oda Yüksekliği',
			field: 'RoomHeight',
			validate: (rowData) =>
				rowData.RoomHeight === undefined || rowData.RoomHeight === ''
					? 'Required'
					: true,
		},
	];
	return (
		<div className="App">
			<h1 align="center">React-App</h1>
			<h4 align="center">
				CRUD operation with Json-Server (with Validation) in Material Table
			</h4>
			<MaterialTable
				title="Student Details"
				columns={columns}
				data={data}
				options={{ actionsColumnIndex: -1, addRowPosition: 'first' }}
				editable={{
					onRowAdd: (newData) =>
						new Promise((resolve, reject) => {
							//Backend call
							fetch(url, {
								method: 'POST',
								headers: {
									'Content-type': 'application/json',
								},
								body: JSON.stringify(newData),
							})
								.then((resp) => resp.json())
								.then((resp) => {
									getProjectRooms();
									resolve();
								});
						}),
					onRowUpdate: (newData, oldData) =>
						new Promise((resolve, reject) => {
							//Backend call
							fetch(url + '/' + oldData.id, {
								method: 'PUT',
								headers: {
									'Content-type': 'application/json',
								},
								body: JSON.stringify(newData),
							})
								.then((resp) => resp.json())
								.then((resp) => {
									getProjectRooms();
									resolve();
								});
						}),
					onRowDelete: (oldData) =>
						new Promise((resolve, reject) => {
							//Backend call
							fetch(url + '/' + oldData.id, {
								method: 'DELETE',
								headers: {
									'Content-type': 'application/json',
								},
							})
								.then((resp) => resp.json())
								.then((resp) => {
									getProjectRooms();
									resolve();
								});
						}),
				}}
			/>
		</div>
	);
}

export default App;
