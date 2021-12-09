import React, { useState, useEffect } from 'react';

function Cta({
  countries,
  mutual,
  countriesHandler,
  mutualHandler,
  resetHandler,
  message,
}) {
  const clickHandler = (e) => {
    e.target.className = e.target.className + ' clicked';
    if (e.target.attributes.name.value === 'countries') countriesHandler();
    if (e.target.attributes.name.value === 'mutual') mutualHandler();
    if (e.target.attributes.name.value === 'reset') {
      resetHandler();
    }
  };
  return (
    <div className="cta">
      {message !== 'Failed to fetch' && (
        <>
          {!countries && (
            <div onClick={clickHandler} className="countries" name="countries">
              Step&nbsp;1&nbsp;-&nbsp;Show&nbsp;10&nbsp;countries
            </div>
          )}
          {!mutual && !message && (
            <div onClick={clickHandler} className="mutual" name="mutual">
              Step&nbsp;2&nbsp;-&nbsp;Show&nbsp;mutual&nbsp;neighbors
            </div>
          )}
        </>
      )}
      {message}
      {message && (
        <div onClick={resetHandler} className="reset" name="reset">
          Try&nbsp;again
        </div>
      )}
    </div>
  );
}

export default Cta;
