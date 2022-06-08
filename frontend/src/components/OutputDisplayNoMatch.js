function OutputDisplayNoMatch() {
  /* If there was not EXACT match, just put this message. */
  return (
    <div style={{ textAlign: 'center' }}>
      There is no item in our database that matches your input.
      We’re expanding our database daily. Please stay tuned for updates!
      Consider discussing treatment options with your neonatal, infectious disease or pharmacy teams in the meantime.
    </div>
  )
}

export default OutputDisplayNoMatch;