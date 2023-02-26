import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

//interface fullpizzzaProps {}

const FullPizza: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = React.useState<{
        imageUrl: string
        title: string
        price: number
    }>({ imageUrl: '', title: '', price: 0 })

    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    'https://62f8bf373eab3503d1da91dd.mockapi.io/pizzasList/' +
                        id
                )
                setPizza(data)
            } catch (error) {
                alert(error)
                navigate('/')
            }
        }
        fetchPizza()
        console.log(pizza)
    }, [])

    if (!pizza) {
        return <>"loading"</>
    }

    return (
        <div className="container">
            <img src={pizza.imageUrl} />
            <h2>{pizza.title}</h2>
            <p>1232132323312</p>
            <h4>{pizza.price}</h4>

            <Link to="/sdsadass">
                <button className="button button--outline button--add">
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    )
}

export default FullPizza
