import { useState } from "react"

export default function App() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    const decrement = () => {
        setCount(count - 1);
    }
    return <div style={{ padding: 10 }}>
        <h1>Counter: {count}</h1>
        <div>
            <button style={{ marginRight: 5 }} onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    </div>
}