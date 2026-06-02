import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Explore = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'
      )

      const data = await response.json()

      setCountries(data)
      setLoading(false)
    }

    getCountries()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesRegion =
      region === '' || country.region === region

    return matchesSearch && matchesRegion
  })

  if (loading) {
    return <h1>Loading...</h1>
  }

 import {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

const Explore = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3'
      )

      const data = await response.json()

      setCountries(data)
      setLoading(false)
    }

    getCountries()
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesRegion =
      region === '' || country.region === region

    return matchesSearch && matchesRegion
  })

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div style={{padding: '20px'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1>🌍 WanderLog</h1>

        <button onClick={logout}>Logout</button>
      </div>

      <input
        type="text"
        placeholder="Search Country"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: '10px',
          marginRight: '10px',
          marginBottom: '20px',
        }}
      />

      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
        style={{padding: '10px'}}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {filteredCountries.slice(0, 50).map(country => (
          <div
            key={country.cca3}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '10px',
            }}
          >
            <img
              src={country.flags.png}
              alt={country.name.common}
              width="100%"
              height="150"
            />

            <h3>{country.name.common}</h3>

            <p>
              <strong>Region:</strong> {country.region}
            </p>

            <p>
              <strong>Population:</strong>{' '}
              {country.population.toLocaleString()}
            </p>

            <Link to={`/country/${country.cca3}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

}

export default Explore