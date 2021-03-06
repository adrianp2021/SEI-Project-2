import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CocktailCard from './CocktailCard'
import PuffLoader from 'react-spinners/PuffLoader'

const CocktailIndex = () => {
  const [cocktails, setCocktails] = useState([])
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCocktails = async () => {
      try {
        const { data } = await axios.get(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
        )
        setCocktails(data.drinks)
      } catch (err) {
        setHasError(true)
      }
    }
    getCocktails()
  }, [])

  useEffect(() => {
    setLoading(true)
  }, [])

  console.log('cocktail', cocktails)
  return (
    <section className="cocktail-index cocktail-page">
      <div className="container">
        {cocktails.length > 0 ? (
          <div className="columns is-multiline">
            {cocktails.map((cocktail) => {
              return <CocktailCard key={cocktail.idDrink} {...cocktail} />
            })}
          </div>
        ) : (
          <div id="error">
            {hasError ? (
              'Something has gone wrong.'
            ) : (
              <PuffLoader loading={loading} size={150} />
            )}
          </div>
        )}
      </div>
    </section>
  )
}
export default CocktailIndex
