import Button from 'react-bootstrap/Button'

import './OutputScale.css';

function OutputScaleSpec1({ activeIndex, onSelect }) {
  function onClick(index) {
    return (e) => {
      onSelect(index)
    };
  };

  return (
    <div className="output-scale-special">
      <Button className="choice-1" active={activeIndex === 0} onClick={onClick(0)}>Alternate A</Button>
      <Button className="choice-2" active={activeIndex === 1} onClick={onClick(1)}>Alternate B</Button>
    </div>
  )
}

export default OutputScaleSpec1;
