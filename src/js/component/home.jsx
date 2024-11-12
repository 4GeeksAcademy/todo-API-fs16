import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

const Home = () => {
	const [item, setItem] = useState("")
	const [toDos, setToDos] = useState([])


	const handleEnter = async (e) => {
		if (e.key === "Enter") {
			fetch("https://playground.4geeks.com/todo/todos/usuariofs001", {
				method: "POST",
				body: JSON.stringify({
					"label": item,
					"is_done": false
				}),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then((res) => {
					if (res.ok) console.log("Tarea agregada correctamente")
				})
			setItem("")
			await handleGetTodos()
		}
	}

	const handleGetTodos = async () => {
		try {
			const res = await fetch("https://playground.4geeks.com/todo/users/usuariofs001")
			const data = await res.json()
			if (res.ok) setToDos(data.todos)
		} catch (error) {
			console.log(error)
		}

	}

	const handleDelete = (id) => {
		fetch("https://playground.4geeks.com/todo/todos/" + id,
			{
				method: "DELETE"
			})
			.then((res) => {
				if (res.ok) console.log("Tarea eliminada correctamente")
			})
		
	}

	useEffect(() => {
		handleGetTodos()

	}, [handleDelete])


	return (
		<div className="container">
			<h1>todos</h1>
			<div className="lista-contenedor">
				<ul>
					<li><input type="text" placeholder="Que falta hacer?" onChange={(e) => setItem(e.target.value)} value={item} onKeyDown={(e) => handleEnter(e)}></input> </li>
					{toDos && toDos.map((item, index) => (
						<li key={index}> {item.label} <i className="fa fa-times" onClick={() => handleDelete(item.id)}></i></li>
					))}
					<li className="faltantes"> {toDos.length} tareas faltantes </li>
				</ul>
			</div>
		</div>
	);
};

export default Home;