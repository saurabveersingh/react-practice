// !definition of component
/**
 *
 * @description --> Home page of the website
 * @returns Home page
 */
// ! component

const Home = () => {
  return (
    <div className="ms-3 mt-5">
      <p>My Components</p>
      <ul>
        <li>
          <a href="/pagination" className="text-blue underline">
            Pagination
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Home
