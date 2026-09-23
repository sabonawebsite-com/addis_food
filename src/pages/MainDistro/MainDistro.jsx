import React from 'react'
import './MainDistro.css'

import { distro } from '../../distro/distro'
import { useNavigate } from 'react-router-dom'


const MainDistro = () => {
  const navigate = useNavigate()

  return (
    <>
      <h1 id='main-text'>Main Distribution</h1>
      <div className='main-distro'>

        {distro.map((item, index) => {
          return (
            <div key={index} className="display">
              <img src={item.images} alt="" className='image' />
              <div className="info">
                <p className='name-reg'>{item.region}</p>
                <p className='fees'>Fee:{item.fees}</p>
                <p className='code'>Code: {item.Code}</p>
                <p>days:{item.days}</p>
              </div>

            </div>

          )

        })}
        <button className='button3' onClick={() => navigate('/myorders')}>fill form</button>
      </div>
    </>
  )
}

export default MainDistro
