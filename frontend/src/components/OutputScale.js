import Button from 'react-bootstrap/Button'

import './OutputScale.css';

function OutputScale({ activeIndex, onSelect }) {
  function onClick(index) {
    return (e) => {
      onSelect(index)
    };
  };

  return (
    <div className="output-scale">
      <Button className="choice-1" active={activeIndex === 0} onClick={onClick(0)}>Broadest</Button>
      <Button className="choice-2" active={activeIndex === 1} onClick={onClick(1)}>&nbsp;</Button>
      <Button className="choice-3" active={activeIndex === 2} onClick={onClick(2)}>&nbsp;</Button>
      <Button className="choice-4" active={activeIndex === 3} onClick={onClick(3)}>Narrowest</Button>
    </div>
  )
}

export default OutputScale;