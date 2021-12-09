import bars from '../assets/bars.png';
import close from '../assets/close.png';

function MenuIcon({ menuHandler, isOpen }) {
  return (
    <div className="menu" onClick={menuHandler}>
      <img
        src={isOpen ? close : bars}
        alt={`${isOpen ? 'close menu' : 'open menu'}`}
      />
    </div>
  );
}

export default MenuIcon;
