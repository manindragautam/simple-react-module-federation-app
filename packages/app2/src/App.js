import { Suspense, lazy } from "react";
import Todo from "./Todo";

const Counter = lazy(() => import('app1/App'));

export default function App() {
    return <div className="grid grid-cols-2">
        <Suspense fallback={<div>Loading...</div>}>
            <Counter />
        </Suspense>
        <Todo />
    </div>
}