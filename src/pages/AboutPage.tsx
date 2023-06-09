import { useState } from "react";
import { Button } from "@talo-code/talo-ui";
import reactLogo from "../assets/react.svg";
import { Link } from "react-router-dom";

const AboutPage = (): React.JSX.Element => {
  const [count, setCount] = useState<number>(0);
  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>ABOUT</h1>
      <div className='card'>
        <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <div className='card'>
        <Link to='/'>Home</Link>
      </div>
    </div>
  );
};

export default AboutPage;
