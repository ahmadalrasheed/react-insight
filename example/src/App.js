import React, { useState } from 'react'
import PerformanceMonitor from './components/PerformanceMonitor'

const App = () => {
  const [items, setItems] = useState([])
  const [showImages, setShowImages] = useState(false)

  // Function to add many DOM elements (performance issue)
  const addManyElements = () => {
    const newItems = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      text: `Item ${i}`
    }))
    setItems(newItems)
  }

  // Function to toggle images with/without alt attributes
  const toggleImages = () => {
    setShowImages(!showImages)
  }

  return (
    <PerformanceMonitor>
      <div className="app">
        <header>
          <h1>React Insight Demo</h1>
          <p>A demonstration of the React Insight performance monitoring library</p>
        </header>

        <div className="controls">
          <button onClick={addManyElements}>
            Add 1000 DOM Elements (Performance Issue)
          </button>
          <button onClick={toggleImages}>
            {showImages ? 'Hide Images' : 'Show Images Without Alt'}
          </button>
        </div>

        <div className="content">
          {items.length > 0 && (
            <div className="items-container">
              <h2>DOM Elements: {items.length}</h2>
              <div className="items-grid">
                {items.map(item => (
                  <div key={item.id} className="item">
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showImages && (
            <div className="images-container">
              <h2>Images Without Alt Attributes</h2>
              <div className="images-grid">
                <img src="https://via.placeholder.com/150" />
                <img src="https://via.placeholder.com/150" />
                <img src="https://via.placeholder.com/150" />
                <img src="https://via.placeholder.com/150" />
                <img src="https://via.placeholder.com/150" />
                <img src="https://via.placeholder.com/150" />
              </div>
            </div>
          )}
        </div>
      </div>
    </PerformanceMonitor>
  )
}

export default App
