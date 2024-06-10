import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import AllScholarshipCard from "./AllScholarshipCard"
import { useLoaderData } from "react-router-dom"
import "./AllScholarship.css"
const AllScholarship = () => {
  const [scholarship, setScholarship] = useState([])
  const [search, setSearch] = useState('');
  const { count } = useLoaderData()
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()]

  /**
   * DONE 1: get the total number of products
   * DONE 2: number of items per page dynamic
   * TODO 3: get the current page
   */

  useEffect(() => {
    fetch(`http://localhost:5000/topScholarship?page=${currentPage}&size=${itemsPerPage}&search=${search}`)
      .then((res) => res.json())
      .then((data) => setScholarship(data))
  }, [currentPage, itemsPerPage,search]);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value)
    console.log(val)
    setItemsPerPage(val);
    setCurrentPage(0)
  }

  const handlePrevPage = () => {
    if(currentPage > 0 ){
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextPage = () => {
    if(currentPage < pages.length - 1){
      setCurrentPage(currentPage + 1);
    }
  }


  const handleSearch = e => {
    e.preventDefault();
    const searchText = e.target.search.value;
    // console.log(searchText);
    setSearch(searchText);
  }

  return (
    <section>
      <Helmet>
        <title>Scholar || All Scholarship</title>
      </Helmet>
      <form onSubmit={handleSearch} className="text-center lg:pt-32 pt-20">
        <input className="border border-black p-2" type="text" name="search" />
        <input type="submit" value="Search" className="btn" />
      </form>
      <div className="space-y-4 my-5">
        {scholarship.map((scholars) => (
          <AllScholarshipCard
            key={scholars._id}
            scholars={scholars}
          ></AllScholarshipCard>
        ))}
      </div>
      <div className="pagination">
        <p>Current Page: {currentPage}</p>
        <button onClick={handlePrevPage}>Prev</button>
        {pages.map((page) => (
          <button
            className={
              currentPage === page ? "selected btn btn-sm btn-outline mt-2 selected" : undefined
            }
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNextPage}>Next</button>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPage}
          name=""
          id=""
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </section>
  )
}

export default AllScholarship
