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
      <div className="triangle">
        <svg  viewBox="0 0 2 2" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="triangle-horizontal" d="M 0 1 L 2 0 V 2 Z" fill="currentColor"/>
          <path className="triangle-vertical" d="M 1 0 L 0 2 H 2 Z" fill="currentColor"/>
        </svg>
      </div>
      <div className="choice-label label-1">Narrowest</div>
      <Button className="choice-1" active={activeIndex === 0} onClick={onClick(0)}>1st Choice</Button>
      <div className="choice-label label-2"><span className="arrow"></span></div>
      <Button className="choice-2" active={activeIndex === 1} onClick={onClick(1)}>2nd Choice</Button>
      <div className="choice-label label-3"><span className="arrow"></span></div>
      <Button className="choice-3" active={activeIndex === 2} onClick={onClick(2)}>3rd Choice</Button>
      <div className="choice-label label-4">Broadest</div>
      <Button className="choice-4" active={activeIndex === 3} onClick={onClick(3)}>4th Choice</Button>
    </div>
  )
}

export default OutputScale;