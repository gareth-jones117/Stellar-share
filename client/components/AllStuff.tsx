import { useAllStuff } from '../hooks/useStuff'
import { Link, useNavigate } from 'react-router-dom'
import { IfAuthenticated } from './Authenticated'

export function AllStuff() {
  const { isPending, isError, data } = useAllStuff()

  const navigate = useNavigate()

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error loading stuff</div>

  return (
    <div className="all-stuff-container">
      <IfAuthenticated >
        <Link to="/addStuff" className="text-2xl text-base1 hover:text-yellow transition duration-300">
        <div className='flex flex-col items-center space-y-4 button add-stuff-button'>
          List your own stuff!
        </div>
        </Link>
      </IfAuthenticated>
      {data.map((stuff) => (
        <div
          tabIndex={0} role="button" aria-pressed="false"
          onClick={() => {
            navigate(`/stuff/${stuff.id}`)
          }}
          key={stuff.id}
          className="stuff-card"
          onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') { navigate(`/stuff/${stuff.id}`); } }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = '0 6px 10px rgba(0, 0, 0, 0.15)')
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)')
          }
        >
          <h1 className="stuff-title">{stuff.name}</h1>
          <div className="stuff-details-list">
            <p>
              <span className="detail-label">Price:</span> ${stuff.price}
            </p>
            <p>
              <span className="detail-label">Bond:</span> ${stuff.bond}
            </p>
            <p>
              <span className="detail-label">Condition:</span> {stuff.condition}
            </p>
          </div>
          <p className="stuff-description">{stuff.description}</p>
        </div>
      ))}
    </div>
  )
}
