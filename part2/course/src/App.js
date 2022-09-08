import Header from "./Components/Header/Header"
import Content from "./Components/Content/Content"
import Total from "./Components/Total/Total"
import Course from "./Components/Course/Course";

const App = () => {
	const courses = [{
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			}
		]
	},{
		name: 'Node.js',
		id: 2,
		parts: [
			{
				name: 'Routing',
				exercises: 3,
				id: 1
			},
			{
				name: 'Middlewares',
				exercises: 7,
				id: 2
			}
		]
	}
	]
	return <>
		{courses.map((k) => <Course course={k} key={k.name}/>)}
		</>
}

export default App
