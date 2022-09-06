import Header from "./Components/Header/Header"
import Content from "./Components/Content/Content"
import Total from "./Components/Total/Total"

const App = () => {
	const course = "Half Stack application development"
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	}
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	}
	const part3 = {
		name: "State of a component",
		exercises: 14,
	}
	return (
		<div>
			<Header course={course} />
			<Content
				exc1={part1.exercises}
				exc2={part2.exercises}
				exc3={part3.exercises}
				part1={part1.name}
				part2={part2.name}
				part3={part3.name}
			/>
			<Total
				exercises1={part1.exercises}
				exercises2={part2.exercises}
				exercises3={part3.exercises}
			/>
		</div>
	)
}

export default App
