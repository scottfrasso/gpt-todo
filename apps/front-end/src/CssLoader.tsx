import React from 'react'
import './CssLoader.css'

interface CssLoaderProps {
  size?: number
  color?: string
}

const CssLoader: React.FC<CssLoaderProps> = ({
  size = 50,
  color = '#3498db',
}) => {
  const loaderStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderColor: color,
    borderTopColor: 'transparent',
  }

  return <div className='css-loader' style={loaderStyle}></div>
}

export default CssLoader
