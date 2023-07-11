import logo from '../../images/mestologo.svg'
export function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Места России"
        className="header__logo"
      />
    </header>
  )
}