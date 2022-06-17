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
      <div className="choice-label">Narrowest</div>
      <Button className="choice-1" active={activeIndex === 0} onClick={onClick(0)}>1st Choice</Button>
      <div className="choice-label"><span className="arrow"></span></div>
      <Button className="choice-2" active={activeIndex === 1} onClick={onClick(1)}>2nd Choice</Button>
      <div className="choice-label"><span className="arrow"></span></div>
      <Button className="choice-3" active={activeIndex === 2} onClick={onClick(2)}>3rd Choice</Button>
      <div className="choice-label">Broadest</div>
      <Button className="choice-4" active={activeIndex === 3} onClick={onClick(3)}>4th Choice</Button>
    </div>
  )
}

export default OutputScale;