import Button from 'react-bootstrap/Button'

import './OutputScale.css';

function OutputScaleSpec1({ activeIndex, onSelect }) {
  function onClick(index) {
    return (e) => {
      onSelect(index)
    };
  };

  return (
    <div className="output-scale">
      <Button className="output-scale-item choice-1" active={activeIndex === 0} onClick={onClick(0)}>Antibiotic Treatment 1st Choice</Button>
      <Button className="output-scale-item choice-2" active={activeIndex === 1} onClick={onClick(1)}>Antibiotic Treatment 2nd Choice</Button>
    </div>
  )
}

export default OutputScaleSpec1;