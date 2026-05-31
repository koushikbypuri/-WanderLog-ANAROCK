import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

const CountryDetails = () => {
  const {code} = useParams()
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha/${code}`
      )

      const data = await response.json()
      setCountry(data[0])
    }

    getCountry()
  }, [code])

  if (!country) {
    return <h1>Loading...</h1>
  }

  const addToBucketList = () => {
    const bucket =
      JSON.parse(localStorage.getItem('bucketList')) || []

    bucket.push(country.name.common)

    localStorage.setItem(
      'bucketList',
      JSON.stringify(bucket)
    )

    alert('Added to Bucket List')
  }

  const markVisited = () => {
    const visited =
      JSON.parse(localStorage.getItem('visited')) || []

    visited.push(country.name.common)

    localStorage.setItem(
      'visited',
      JSON.stringify(visited)
    )

    alert('Marked as Visited')
  }

  return (
    <div>
      <Link to="/explore">Back</Link>

      <h1>{country.name.common}</h1>

      <img
        src={country.flags.png}
        alt={country.name.common}
        width="250"
      />

      <h3>Capital: {country.capital?.[0]}</h3>

      <h3>Region: {country.region}</h3>

      <h3>Population: {country.population}</h3>

      <button onClick={addToBucketList}>
        Add To Bucket List
      </button>

      <button onClick={markVisited}>
        Mark Visited
      </button>
    </div>
  )
}

export default CountryDetails